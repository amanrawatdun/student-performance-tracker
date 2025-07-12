import axios from "axios";


const API=axios.create({
    baseURL:'https://student-performance-tracker-backend-cdc0.onrender.com'
});

// Add token to requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
