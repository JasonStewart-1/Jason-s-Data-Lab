
// ==========================================
// 📤 WEEK 3: DataUpload.tsx - File Upload Component
// ==========================================
// This component handles CSV file uploads and will be enhanced throughout the course
// 🔧 WEEK 3: Students will add form validation and user input handling
// 🔧 WEEK 4: Students will enhance data processing capabilities  
// 🔧 WEEK 5: Students will add advanced file handling and validation
// 🔧 WEEK 6: Students will connect this to chart generation
// 🔧 WEEK 7: Students will integrate with external APIs

// C:\Users\JasonStewart\data-discovery-plug\src\components\DataUpload.tsx
import React, { useCallback, useState } from 'react';

/**
 * If your project already defines DataRow elsewhere, feel free to
 * delete this alias and import it instead. It's just a flexible row type.
 */
export type DataRow = Record<string, string | number | boolean | null>;

// ✅ Step 2: Define the props interface
interface DataUploadProps {
  onDataLoad: (data: DataRow[], fileName: string) => void;
}

/**
 * Very light CSV parser that handles:
 * - header row
 * - quoted fields with commas
 * - number coercion (e.g., "42" -> 42)
 * For heavy-duty parsing, swap to Papa Parse later.
 */
function parseCSV(text: string): DataRow[] {
  // Split lines (support \r\n and \n)
  const lines = text.replace(/\r/g, '').split('\n').filter(l => l.length > 0);
  if (lines.length === 0) return [];

  // Parse a CSV line with quotes
  const splitCSV = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        // Double quote inside quoted field -> treat as escaped quote
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  };

  const headers = splitCSV(lines[0]).map(h => h.trim());

  const coerce = (v: string): string | number | boolean | null => {
    const t = v.trim();
    if (t === '' || t.toLowerCase() === 'null') return null;
    if (t.toLowerCase() === 'true') return true;
    if (t.toLowerCase() === 'false') return false;
    // number?
    const n = Number(t);
    if (!Number.isNaN(n) && t.match(/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i)) return n;
    return t;
  };

  const rows: DataRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCSV(lines[i]);
    if (cells.length === 1 && cells[0].trim() === '') continue; // skip blank rows
    const row: DataRow = {};
    headers.forEach((h, idx) => {
      row[h || `col_${idx + 1}`] = coerce(cells[idx] ?? '');
    });
    rows.push(row);
  }
  return rows;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataLoad }) => {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<DataRow[]>([]);

  // ✅ Step 3: parent-callback wrapper
  const handleFileLoad = useCallback((data: DataRow[], file: File) => {
    onDataLoad(data, file.name); // <-- events go UP to the parent
  }, [onDataLoad]);

  const readFile = async (file: File) => {
    setError('');
    setFileName(file.name);

    try {
      const text = await file.text();
      const rows = parseCSV(text);
      setPreview(rows.slice(0, 5)); // show a few preview rows in this component
      handleFileLoad(rows, file);   // ✅ notify parent with full dataset
    } catch (e) {
      console.error(e);
      setError('Failed to read/parse file. Please make sure it’s a CSV.');
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) readFile(f);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) readFile(f);
  };

  const preventDefault: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-2">Upload CSV</h3>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        className="border-2 border-dashed rounded-md p-6 text-center mb-3"
      >
        <p className="mb-2">Drag & drop your <span className="font-medium">.csv</span> here</p>
        <p className="text-sm text-gray-500 mb-3">or choose a file</p>
        <input type="file" accept=".csv,text/csv" onChange={handleInputChange} />
      </div>

      {/* Status */}
      {fileName && (
        <div className="text-sm text-gray-700 mb-2">
          Selected: <span className="font-medium">{fileName}</span>
        </div>
      )}
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      {/* Tiny preview table (first 5 rows) */}
      {preview.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(preview[0]).map((k) => (
                  <th key={k} className="px-2 py-1 border text-left font-medium">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50">
                  {Object.keys(preview[0]).map((k) => (
                    <td key={k} className="px-2 py-1 border">
                      {String(row[k] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1">Showing first {preview.length} rows.</p>
        </div>
      )}
    </div>
  );
};

export default DataUpload;
