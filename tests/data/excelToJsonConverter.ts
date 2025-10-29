import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Recreate __dirname and __filename in ESM context
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFilename = path.join(__dirname, 'customer_data.xlsx');

/**
 * Converts the given Excel file into JSON and saves it.
 *
 * @param filePath - Optional path to the Excel file (defaults to `customer_data.xlsx` in same folder)
 * @returns Array of JSON objects representing Excel data
 */
export function excelToJson(filePath: string = excelFilename): Record<string, any>[] | undefined {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const jsonData: Record<string, any>[] = xlsx.utils.sheet_to_json(worksheet);

    // Save JSON file
    const outputPath = path.resolve(__dirname, 'customer_Data.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

    console.log(`✅ Converted successfully → ${outputPath}`);
    return jsonData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error converting Excel to JSON:', error.message);
    } else {
      console.error('❌ Unknown error:', error);
    }
  }
}
