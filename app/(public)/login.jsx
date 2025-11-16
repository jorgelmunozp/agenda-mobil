import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../../src/assets/styles/colors';
import { styles } from '../../src/assets/styles/styles';
import { AppAlert } from '../../src/components/alert/AppAlert';
import { Button } from '../../src/components/button/Button';
import { Input } from '../../src/components/input/Input';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';
import { errorLines } from '../../src/helpers/errorLines';
import { api } from '../../src/services/api/api';
import { AuthContext } from '../../src/services/auth/authContext';
import { types } from '../../src/services/auth/types/types';
import { useAlert } from '../../src/hooks/useAlert';

const authEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_AUTH;

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alert, showError, hideAlert } = useAlert();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post(authEndpoint, { username, password });
      const data = response?.data ?? {};

      if (data?.token) {
        await AsyncStorage.setItem('token', String(data.token));
      }

      dispatch({
        type: types.login,
        payload: { id: String(data?.id), name: username },
      });
    } catch (e) {
      const lines = errorLines(e);
      const message = lines.length > 0 ? lines : ['No se pudo iniciar sesión'];

      // usa el hook en lugar del estado local de alerta
      showError('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Title>INICIAR SESION</Title>

          <Label>Ingresa tu usuario</Label>
          <Input value={username} onChangeText={setUsername} isIcon={true} icon="person-circle-outline" keyboardType="email-address" autoCapitalize="none" />

          <Label>Ingresa tu contraseña</Label>
          <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" />

          <View style={styles.actions}>
            <Button label="Ingresar" fallbackLabel="Cargando..." onPress={handleLogin} disabled={loading} backgroundColor={colors.button} />
            <Button label="Registrarse" fallbackLabel="Registrando..." onPress={() => router.push('/(public)/register')} backgroundColor={colors.button} />
            <Button label="¿Olvidaste tu contraseña?" onPress={() => router.push('/(public)/password-recover')} backgroundColor={colors.black} borderWidth={1} borderColor={colors.red} borderStyle="solid" />
          </View>
        </View>
      </ScrollView>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hideAlert} />
    </>
  );
}
