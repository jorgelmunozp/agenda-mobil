import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Interceptor para adjuntar el token en cada request (usando AsyncStorage)
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};          // por si headers viene undefined
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
