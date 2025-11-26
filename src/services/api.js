import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 10000;

//// Membuat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Tambahkan logika sebelum permintaan dikirim,
    // misalnya menambahkan token otentikasi
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Tangani kesalahan sebelum permintaan dikirim
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  // Tangani respons sukses di sini jika diperlukan
  return response;
});

export default api;
