// apps/upload/src/app/UploadPage.tsx
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
  } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    multiple: true,
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      <div
        {...getRootProps()}
        className={`
          w-full max-w-lg p-8 mb-6 rounded-2xl shadow-2xl border-2 border-dashed
          transition-all duration-200 cursor-pointer flex flex-col items-center justify-center
          ${dropzoneActive || isDragActive
          ? "border-blue-500 bg-blue-50 scale-105"
          : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"}
        `}
        style={{ minHeight: 220 }}
      >
        <input {...getInputProps()} />
        <svg
          className="w-12 h-12 mb-3 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 26l10-10 10 10M24 36V16"
          />
        </svg>
        <p className="text-lg font-semibold text-blue-700 mb-2">
          {dropzoneActive || isDragActive
            ? "Drop files here!"
            : "Drag & drop files here, or click to browse"}
        </p>
        <p className="text-sm text-gray-500">
          Supported: images, docs, and more. Max 5 files.
        </p>
      </div>

      <div className="w-full max-w-lg">
        {files.length > 0 && (
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-bold text-blue-700 mb-3">Files to upload:</h3>
            <ul className="divide-y divide-gray-200">
              {files.map((file, i) => (
                <li key={i} className="py-2 flex items-center gap-3">
                  <span className="truncate flex-1">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  {/* Optionally: add remove file button here */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
