import * as XLSX from "xlsx";

interface ExportColumn<T> {
  header: string;
  accessor: (row: T) => string | number;
}

export function exportToExcel<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const rows = data.map((row) => {
    const obj: Record<string, string | number> = {};
    columns.forEach((col) => {
      obj[col.header] = col.accessor(row);
    });
    return obj;
  });

  const ws = XLSX.utils.json_to_sheet(rows);

  const colWidths = columns.map((col) => ({
    wch: Math.max(col.header.length, 12),
  }));
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToCsv<T>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const headers = columns.map((c) => c.header);
  const rows = data.map((row) => columns.map((col) => String(col.accessor(row))));

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
