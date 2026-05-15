import ExcelJS from "exceljs";

interface ExportColumn<T> {
  header: string;
  accessor: (row: T) => string | number;
}

function sanitizeCsvCell(value: string): string {
  const str = String(value);
  if (/^[=+\-@]/.test(str)) {
    return `'${str}`;
  }
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function exportToExcel<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Sheet1");

  ws.columns = columns.map((col) => ({
    header: col.header,
    key: col.header,
    width: Math.max(col.header.length, 12),
  }));

  data.forEach((row) => {
    const obj: Record<string, string | number> = {};
    columns.forEach((col) => {
      obj[col.header] = col.accessor(row);
    });
    ws.addRow(obj);
  });

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToCsv<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const headers = columns.map((c) => c.header);
  const rows = data.map((row) =>
    columns.map((col) => sanitizeCsvCell(String(col.accessor(row))))
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
