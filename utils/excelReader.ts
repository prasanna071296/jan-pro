 import * as fs from "fs";
 import * as path from "path";
 import ExcelJS from "exceljs";
 import { fileURLToPath } from "url";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 export interface TestData {
   baseUrl: string;
   advisorEmail: string;
   advisorPassword: string;
   firstNam: string;
   lastNam: string;
   businessNam: string;
   typeOfBusines: string;
   revenue: string;
   age: string;
   emailAddres: string;
   additionalAdvisorEmai: string;
   zipCod: string;
   note: string;
 }

 export async function readExcelData(sheetName: string): Promise<TestData[]> {
   const filePath = path.resolve(__dirname, "../tests/data/ExitSmartData.xlsx");
   console.log("Reading Excel file from:", filePath);
   if (!fs.existsSync(filePath)) {
     throw new Error(`Excel file not found at path: ${filePath}`);
   }

   const workbook = new ExcelJS.Workbook();
   await workbook.xlsx.readFile(filePath);

   const sheet = workbook.getWorksheet(sheetName);
   if (!sheet) {
     throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
   }

   // Get header row
   const headerRow = sheet.getRow(1);
   if (!headerRow || !headerRow.values) {
     throw new Error(`Header row not found or empty in sheet: ${sheetName}`);
   }

   const headerValues = Array.isArray(headerRow.values)
     ? headerRow.values.slice(1)
     : [];

   const data: TestData[] = []
   // Loop through rows 
  sheet.eachRow((row, rowNumber) => {     if (rowNumber === 1) return; // skip header row

     const rowValues = Array.isArray(row.values) ? row.values.slice(1) : [];

     if (rowValues.every((cell) => cell === null || cell === undefined || cell === "")) {
       return; // skip empty rows
     }

     const obj: Record<string, any> = {};

     headerValues.forEach((header: any, i: number) => {
       if (!header) return;
       const key = String(header).trim().replace(/\s+/g, "");
      
       obj[key] = rowValues[i]?.toString().trim() ?? "";

     });
     data.push(obj as TestData);
   });

  console.log("Read Excel data:", data);
   return data;
 }


