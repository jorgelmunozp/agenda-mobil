import { Stack } from 'expo-router';
import { AuthProvider } from '../src/services/auth/AuthProvider';
import { Header } from '../src/components/header/Header';
import { AppMenu } from '../src/components/menu/AppMenu';
import { useFonts } from 'expo-font';
import { CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import { Itim_400Regular } from '@expo-google-fonts/itim';

export default function RootLayout(){
  const [loaded] = useFonts({ CarterOne_400Regular, Itim_400Regular });
  if(!loaded) return null;

  return (
    <AuthProvider>
        <Header />
        <Stack screenOptions={{ headerShown:false }} />
        <AppMenu />
    </AuthProvider>
  );
}
