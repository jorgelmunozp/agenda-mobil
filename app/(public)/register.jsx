import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppAlert } from '../../src/components/alert/AppAlert';
import { Button } from '../../src/components/button/Button';
import { Input } from '../../src/components/input/Input';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';
import { sp } from '../../src/dimensions';
import { errorLines } from '../../src/helpers/errorLines';
import { api } from '../../src/services/api/api';
import { AuthContext } from '../../src/services/auth/authContext';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';
import { types } from '../../src/types/types';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

export default function Register() {
  const { dispatch } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ visible: false, title: '', message: '', buttons: [], type: 'info' });
  const show = (title, message, buttons, type = 'info') => setAlert({ visible: true, title, message, buttons: buttons?.length ? buttons : [{ text: 'Aceptar' }], type });
  const hide = () => setAlert((a) => ({ ...a, visible: false }));

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await api.post(usersEndpoint, { username, password, name, email });
      const data = response?.data || {};
      if (data?.token) await AsyncStorage.setItem('token', String(data.token));
      dispatch({ type: types.login, payload: { id: String(data?.id), name: username } });
    } catch (e) {
      const lines = errorLines(e);
      show('Faltan Datos', lines.length ? lines : ['No se pudo registrar'], undefined, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Title>REGISTRARSE</Title>

          <Label>Nombre</Label>
          <Input value={name} onChangeText={setName} isIcon={true} icon="person-outline" autoCapitalize="words" />

          <Label>Correo</Label>
          <Input value={email} onChangeText={setEmail} isIcon={true} icon="at" keyboardType="email-address" autoCapitalize="none" />

          <Label>Usuario</Label>
          <Input value={username} onChangeText={setUsername} isIcon={true} icon="person-circle-outline" autoCapitalize="none" />

          <Label>Contraseña</Label>
          <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" />

          <View style={styles.actions}>
            <Button label="Crear cuenta" fallbackLabel="Registrando..." onPress={handleRegister} disabled={loading} backgroundColor={colors.button} />
            <Button label="Cancelar" fallbackLabel="Cancelando..." onPress={() => router.push('/(public)/login')} backgroundColor={colors.button} />
          </View>
        </View>
      </ScrollView>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hide} />
    </>
  );
}
