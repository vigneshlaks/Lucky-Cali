// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.auth.localhost',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;