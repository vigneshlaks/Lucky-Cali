// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;