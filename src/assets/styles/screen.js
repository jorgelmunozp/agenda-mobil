import { Dimensions } from 'react-native';

// Escala móvil: factor 0.9 en fuentes y sp con mínimo 1
const { width } = Dimensions.get('window');
const base = 414;
const scale = Math.min(width / base, 1);

export const fs = n => Math.round(n * scale * 0.9); //Font Size
export const sp = n => Math.max(1, Math.round(n * scale)); //Size Panel