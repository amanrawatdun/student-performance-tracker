# 📊 Student Performance Tracker

A MERN-based dashboard for teachers to manage and track student performance, including **attendance**, **grades**, and **behavioral remarks** — all in one place.

## 🚀 Features

- ✅ **Teacher Authentication** (JWT-based)
- 👨‍🎓 **Student CRUD**: Add, View, Edit, Delete student records
- 📅 **Attendance Tracking**: Daily logs
- 📈 **Grades Recording**: Subject-wise marks and averages
- 💬 **Behavioral Remarks**: Notes, flags, or disciplinary tags
- 🔎 **Search & Filter** students
- 📊 **Data Visualization**: Charts using Recharts 
- 📁 **Export to CSV / PDF**: Printable reports

## 🛠️ Tech Stack

### Frontend:
- React
- Redux Toolkit
- React Router DOM
- Axios
- Recharts 
- Tailwind CSS (or your CSS framework)

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- CORS, bcrypt, dotenv

## 📦 Folder Structure

```bash
student-performance-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
└── README.md
