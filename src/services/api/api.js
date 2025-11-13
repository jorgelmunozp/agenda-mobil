import axios from 'axios';

// Para desarrollo (DEV)
const dbHost = process.env.EXPO_PUBLIC_BACKEND_HOST ?? '';
const dbPort = process.env.EXPO_PUBLIC_BACKEND_PORT ?? '';
const dbBaseURL = `http://${dbHost}:${dbPort}`;

// URL base según el entorno PROD o DEV
const baseURL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD || dbBaseURL;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
