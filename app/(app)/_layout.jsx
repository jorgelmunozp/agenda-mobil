import { Slot, Redirect } from 'expo-router';
import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../src/services/auth/authContext';

export default function PrivateLayout() {
  const { logged, restored } = useContext(AuthContext);

  // Espera a restaurar el estado (evita parpadeos)
  if (!restored) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5c3b99'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Si no está logueado => fuera
  if (!logged) {
    return <Redirect href="/(public)/login" />;
  }

  // Autenticado => carga la pantalla de /(app)
    return ( <Slot/> );
}
