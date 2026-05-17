import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000
});

api.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err.response ? err.response.data : err);
  }
);

export default api;
