import { Slot, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../src/services/auth/authContext';

export default function PrivateLayout() {
  const { logged, restored } = useContext(AuthContext);
  const router = useRouter();

  // Redirección inmediata cuando ya se restauró y NO hay sesión
  useEffect(() => {
    if (!restored) return;
    if (!logged) router.replace('/(public)/login');
  }, [restored, logged, router]);

  // Evita parpadeos mientras se restaura
  if (!restored) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#5c3b99' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Mientras hace el replace, no muestres las pantallas privadas
  if (!logged) return null;

  return <Slot />;
}
