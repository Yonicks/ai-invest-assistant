import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { supabase } from '../supabaseClient';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const DB_SCHEMA = [
  'asset_name',
  'symbol',
  'amount',
  'price',
  'value',
  'currency',
  'user_id',
  'uploaded_at',
  'original_filename',
];

// Helper: Call OpenAI for header row index and mapping
async function detectHeaderAndMapping(rows: string[][], dbSchema: string[]) {
  const previewLines = rows.map((r) => r.join(',')).join('\n');
  const prompt = `
Analyze this table sample (CSV). Identify which row (starting at 1) contains headers. Map each header to this database schema: [${dbSchema.join(', ')}].
Rows:
${previewLines}

Respond only in JSON:
{"header_row_index": X, "mapping": {"header1":"db_column", ...}}
`;
  console.log('----- OpenAI Prompt -----\n', prompt);

  const gptRes = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,
  });

  const jsonRes = gptRes.choices[0].message.content?.trim();
  console.log('----- OpenAI Raw Response -----\n', jsonRes);

  return JSON.parse(jsonRes || '{}');
}

export async function uploadPortfolio(req: Request, res: Response) {
  console.log('----- File Upload Request Received -----');
  if (!req.file) {
    console.error('No file uploaded!');
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // 1. Parse file to worksheet
  let workbook;
  try {
    workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  } catch (err) {
    console.error('XLSX Parsing Error:', err);
    return res.status(400).json({ error: 'Error parsing file.' });
  }
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  console.log('----- Sheet Name -----', sheetName);
  console.log('----- First 5 Rows of Sheet -----\n', rows.slice(0, 5));

  // 2. Get first 10 rows for AI
  const previewRows = rows.slice(0, 10);

  // 3. Ask OpenAI for header info
  let mappingResult;
  try {
    mappingResult = await detectHeaderAndMapping(previewRows, DB_SCHEMA);
  } catch (e) {
    console.error('OpenAI mapping failed:', e);
    return res.status(500).json({ error: 'OpenAI mapping failed: ' + e });
  }
  console.log('----- OpenAI Mapping Result -----\n', mappingResult);

  const { header_row_index, mapping } = mappingResult;
  if (!header_row_index || !mapping) {
    console.error('Header row or mapping not found!');
    return res
      .status(400)
      .json({ error: 'Could not find header row or mapping.' });
  }

  // 4. Extract headers and data rows
  const headerRow = rows[header_row_index];
  const dataRows = rows.slice(header_row_index + 1);

  console.log('----- Detected Header Row -----\n', headerRow);
  console.log('----- First Data Row -----\n', dataRows[0]);

  // 5. Get user_id from JWT
  const user_id = (req as any).user?.userId;
  if (!user_id) {
    console.warn('No user_id found in token!');
    return res.status(401).json({ error: 'Unauthorized: No user id in token.' });
  }

  // 6. Map each row to investment object using mapping
  const investments = dataRows
    .filter((row) => row.some((cell) => cell && String(cell).trim() !== '')) // skip empty rows
    .map((row, idx) => {
      const obj: any = {
        user_id,
        uploaded_at: new Date().toISOString(),
        original_filename: req.file?.originalname,
      };
      for (let i = 0; i < headerRow.length; i++) {
        const header = headerRow[i];
        const dbField = mapping[header];
        if (dbField && DB_SCHEMA.includes(dbField)) {
          obj[dbField] = row[i] ?? null;
        }
      }
      // Log first 2 mapped investments for debugging
      if (idx < 2) {
        console.log(`----- Investment [${idx}] -----\n`, obj);
      }
      return obj;
    })
    .filter(obj => obj.asset_name && String(obj.asset_name).trim() !== '');

  // 7. Bulk insert into Supabase
  try {
    const { error } = await supabase.from('investments').insert(investments);
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }
  } catch (e) {
    console.error('Supabase insert failed:', e);
    return res.status(500).json({ error: String(e) });
  }

  console.log('----- Upload Success -----', { count: investments.length });
  return res
    .status(200)
    .json({ result: 'Upload and save successful!', count: investments.length });
}
