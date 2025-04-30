# 📚 Internship Tracker App

A React web application for managing internship submissions, exporting data, and sharing application links via WhatsApp. Built to help users organize and access internship records easily.

---

## 🚀 Features

- 📝 Add, edit, and delete internship entries
- 👤 Filter internships by user
- 📤 Export internship data to CSV
- 📲 Share links via WhatsApp with selected users
- 📁 Optional: Fetch internship data from a Google Sheet

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **CSV Export**: Blob API
- **Messaging**: WhatsApp URL API
- **(Optional)**: Google Apps Script for Google Sheets integration

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EnnyBae-Chilled/Internship-app.git
cd internship-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

## 📂 Project Structure

```bash
src/
├── components/
│   ├── InternshipForm.js
│   ├── InternshipTable.js
│   ├── UserFilter.js
│   ├── ExportControls.js
│   └── LinkSharePopup.js
├── App.js
├── styles.css
└── index.js

```

## Future Improvements

🔐 Authentication (e.g. Firebase)

☁️ Persistent backend (e.g. Supabase, MongoDB)

📱 Improved mobile UI/UX

👥 User roles & admin controls

## 🤝 Contributing

Pull requests are welcome! Feel free to open an issue first to discuss what you would like to change.

## 📄 License

MIT © 2025 Joseph Oduyebo
