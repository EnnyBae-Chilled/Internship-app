export async function createPersonalSpreadsheet(userId, userName) {
  // In production, implement with Google Sheets API
  console.log(`Creating sheet for ${userName}`);

  // This would be your backend API endpoint
  const response = await fetch("/api/create-sheet", {
    method: "POST",
    body: JSON.stringify({ userId, userName }),
  });

  return response.json();
}

export async function addToSpreadsheet(userId, data) {
  // Example data structure:
  const rowData = {
    timestamp: new Date().toISOString(),
    linkTitle: data.title,
    linkUrl: data.url,
    sharedBy: data.sharedByName,
  };

  // This would call your backend
  await fetch("/api/append-to-sheet", {
    method: "POST",
    body: JSON.stringify({ userId, rowData }),
  });
}
