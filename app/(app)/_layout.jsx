import { Slot, Redirect } from 'expo-router';
import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../src/services/auth/authContext';

export default function PrivateLayout() {
  const { logged, restored } = useContext(AuthContext);

  // Mientras se restaura el estado, muestra loader
  if (!restored) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5c3b99' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Si NO hay sesión → nunca renderiza las privadas
  if (!logged) {
    return <Redirect href="/(public)/login" />;
  }

  // Usuario autenticado → muestra las rutas privadas
  return <Slot />;
}
