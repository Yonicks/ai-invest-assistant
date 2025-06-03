import { Component } from '@angular/core';
import { NgClass, NgIf, NgForOf } from '@angular/common'; // <-- ADD THESE
import * as XLSX from 'xlsx';
import { InvestmentUploadService } from '../../services/investment-upload.service'; // <-- ADD THIS

@Component({
  selector: 'app-investment-upload',
  standalone: true,
  imports: [NgClass, NgIf, NgForOf],  // <-- ADD THESE
  template: `
    <div class="w-full max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-4 sm:mt-12 p-3 sm:p-6 md:p-12 bg-white rounded-xl shadow-xl">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center">Upload Investment Portfolio</h2>

      <div
        class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors duration-200 py-8 sm:py-12 cursor-pointer w-full"
        [ngClass]="{
      'border-blue-500 bg-blue-50': dragging,
      'border-gray-300 bg-gray-50': !dragging
    }"
        (click)="fileInput.click()"
        (drop)="onDrop($event)"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (dragend)="onDragLeave($event)"
      >
        <input
          type="file"
          accept=".csv,.xlsx"
          style="display: none"
          #fileInput
          (change)="onFileSelected($event)"
        />
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-8m0 0l-3.5 3.5M12 8l3.5 3.5M20.5 17.5a4.5 4.5 0 01-7.1-3.5H4a2 2 0 010-4h9.4a4.5 4.5 0 017.1 3.5 4.5 4.5 0 01-4.5 4.5z"/>
          </svg>
          <span class="text-gray-600 text-base md:text-lg">Click or drag CSV/Excel file here</span>
          <span class="text-xs text-gray-400 mt-1">.csv, .xlsx only</span>
        </div>
      </div>

      <button
        class="w-full mt-4 sm:mt-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60 text-base md:text-lg"
        (click)="onUpload()" [disabled]="!selectedFile"
      >
        Upload
      </button>

      <div *ngIf="uploadStatus" class="text-center mt-3 sm:mt-4 text-sm md:text-base font-semibold"
           [ngClass]="{'text-green-600': uploadStatus === 'Upload successful!', 'text-red-600': uploadStatus.startsWith('Error')}">
        {{ uploadStatus }}
      </div>

      <div *ngIf="previewData" class="mt-5 sm:mt-6">
        <h3 class="font-bold mb-2 text-base sm:text-lg">Preview:</h3>
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full text-xs sm:text-sm md:text-base">
            <tr *ngFor="let row of previewData; let i = index" [ngClass]="i === 0 ? 'bg-blue-100 font-semibold' : 'bg-white'">
              <td *ngFor="let cell of row" class="px-2 py-2 border-b border-gray-100 whitespace-nowrap">{{ cell }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class InvestmentUploadComponent {
  uploadStatus = '';
  previewData: string[][] | null = null;
  selectedFile: File | null = null;
  dragging = false;

  constructor( private investmentUploadService: InvestmentUploadService
  ) {}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.previewFile(file);
    }
  }

  previewFile(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv') {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        this.previewData = text
          .split('\n')
          .filter(line => !!line.trim())
          .map(row => row.split(','));
      };
      reader.readAsText(file);
    } else if (ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.previewData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.uploadStatus = 'Unsupported file type.';
      this.previewData = null;
    }
  }


  onUpload() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Please select a file.';
      return;
    }
    this.uploadStatus = 'Uploading...';
    this.investmentUploadService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadStatus = 'Upload successful!';
      },
      error: (err) => {
        this.uploadStatus = 'Error uploading file.';
      },
    });
  }
}
