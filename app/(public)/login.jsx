import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AppAlert } from '../../src/components/alert/AppAlert';
import { Button } from '../../src/components/button/Button';
import { Input } from '../../src/components/input/Input';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';
import { fs, sp } from '../../src/dimensions';
import { api } from '../../src/services/api/api';
import { AuthContext } from '../../src/services/auth/authContext';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';
import { types } from '../../src/types/types';

// Convierte error backend a lista (bullets) como SweetAlert
const errorLines = (e) => {
  const data = e?.response?.data;
  if (Array.isArray(data?.error?.message)) return data.error.message.filter(Boolean);
  const candidates = [data?.error?.message, data?.message, data?.detail, e?.message].filter((s) => typeof s === 'string' && s.trim());
  const first = candidates[0] || '';
  return first
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);
};

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ visible: false, title: '', message: '', buttons: [], type: 'info' });
  const show = (title, message, buttons, type = 'info') => setAlert({ visible: true, title, message, buttons: buttons?.length ? buttons : [{ text: 'Aceptar' }], type });
  const hide = () => setAlert((a) => ({ ...a, visible: false }));

  const handleLogin = async () => {
    // Validación local -> bullets
    const missing = [];
    if (missing.length) {
      show('Faltan Datos', missing, undefined, 'error');
      return;
    }

    setLoading(true);
    try {
      const r = await api.post('/auth/login', { username, password });
      const d = r?.data ?? {};
      if (d?.token) await AsyncStorage.setItem('token', String(d.token));
      if (d?.id) await AsyncStorage.setItem('userId', String(d.id));
      dispatch({ type: types.login, payload: d?.user ?? { name: username } });

      const successMsg = d?.message || 'Inicio de sesión exitoso';
      show('Bienvenido', successMsg, [{ text: 'Ir al Home', onPress: () => router.replace({ pathname: '/(app)/home', params: { userId: String(d.id) } }) }], 'success');
    } catch (e) {
      const lines = errorLines(e);
      show('Faltan Datos', lines.length ? lines : ['No se pudo iniciar sesión'], undefined, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={{ alignItems: 'center', paddingVertical: sp(styles.gapXL) }}>
        <View style={styles.container}>
          <Title>INICIAR SESION</Title>

          <Label>Ingresa tu usuario</Label>
          <Input value={username} onChangeText={setUsername} isIcon={true} icon="person-circle-outline" keyboardType="email-address" autoCapitalize="none" />

          <Label>Ingresa tu contraseña</Label>
          <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" />

          <View style={styles.actions}>
            <Button label="Ingresar" fallbackLabel="Cargando..." onPress={handleLogin} disabled={loading} />
            <Button label="Registrarse" fallbackLabel="Registrando..." onPress={() => router.push('/(public)/register')} />
            <Pressable onPress={() => router.push('/(public)/recover')} style={{ backgroundColor: '#d00000', borderRadius: sp(styles.radius + 2), padding: sp(1), marginTop: sp(12) }}>
              <View style={{ backgroundColor: colors.black, height: sp(styles.btnH), borderRadius: sp(styles.radius + 2), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.white, fontSize: fs(16), fontWeight: '800' }}>¿Olvidaste tu contraseña?</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <AppAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        buttons={alert.buttons}
        type={alert.type}
        btnColor={colors.black}
        onClose={hide}
      />
    </>
  );
}
