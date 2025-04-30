import * as XLSX from "xlsx";

export function exportToExcel(data, fileName = "internship-data.xlsx") {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Internships");
  XLSX.writeFile(wb, fileName);
}
export function exportToCSV(data, fileName = "internship-data.csv") {
  // Convert array of objects to CSV string
  const headers = Object.keys(data[0]).join(",");
  const rows = data
    .map((obj) =>
      Object.values(obj)
        .map((value) =>
          typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
        )
        .join(",")
    )
    .join("\n");

  const csvContent = `${headers}\n${rows}`;

  // Create download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateUserSpreadsheet(userId, allSubmissions, users) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const userSubmissions = allSubmissions.filter(
    (sub) => sub.submittedBy === userId
  );

  if (userSubmissions.length === 0) {
    alert(`${user.name} has no submissions yet`);
    return;
  }

  const fileName = `${user.name.replace(/\s+/g, "_")}_internships.csv`;
  exportToCSV(userSubmissions, fileName);
}

export function generateAllSpreadsheet(allSubmissions) {
  if (allSubmissions.length === 0) {
    alert("No internship data available yet");
    return;
  }
  exportToCSV(allSubmissions, "all_internships.csv");
}
