import React, { useState } from "react";

export default function ExportControls({ internships, users }) {
  const [selectedUserId, setSelectedUserId] = useState("all");

  const handleExport = () => {
    const userId = selectedUserId === "all" ? "all" : selectedUserId;
    const url = `https://script.google.com/macros/s/AKfycbyXW-Xr6hV5Av6pVOLY3eDqVrWpgSEtpiqM0tQLA86vL5o6r1qu3_O-FMjuLuztEEbJiA/exec?id=${userId}`;
    window.open(url, "_blank");
  };

  // const exportToCSV = (data, fileName) => {
  //   const headers = Object.keys(data[0]).join(",");
  //   const rows = data
  //     .map((obj) =>
  //       Object.values(obj)
  //         .map((value) =>
  //           typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
  //         )
  //         .join(",")
  //     )
  //     .join("\n");

  //   const csvContent = `${headers}\n${rows}`;
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);

  //   link.setAttribute("href", url);
  //   link.setAttribute("download", fileName);
  //   link.style.visibility = "hidden";

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="export-controls">
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="all">All Data</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}'s Data
          </option>
        ))}
      </select>
      <button onClick={handleExport}>Export as CSV</button>
    </div>
  );
}
