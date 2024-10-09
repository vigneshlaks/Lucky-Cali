// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.lucky-cali.com',  
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;
