import axios from 'axios';
import Constants from 'expo-constants';

const raw = (Constants?.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000').trim();
export const api = axios.create({
  baseURL: raw.replace(/\/+$/,''),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});
export default api;
