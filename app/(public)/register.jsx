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
import { api } from '../../src/services/api/api';
import { AuthContext } from '../../src/services/auth/authContext';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';
import { types } from '../../src/types/types';

// Convierte errores del backend a lista (bullets) o líneas
const errorLines = (e) => {
  const data = e?.response?.data;

  // Si viene como array (p.ej. validaciones)
  if (Array.isArray(data?.error?.message)) return data.error.message.filter(Boolean);
  if (Array.isArray(data?.message)) return data.message.filter(Boolean);
  if (Array.isArray(data?.errors)) return data.errors.map((x) => (typeof x === 'string' ? x : x?.message || JSON.stringify(x))).filter(Boolean);

  // String: usa el mensaje más informativo y separa por líneas
  const msg = data?.error?.message || data?.message || data?.detail || e?.message || 'No se pudo registrar';
  return String(msg)
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);
};

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
    const missing = [];
    // if (!name) missing.push('El nombre es obligatorio');
    // if (!email) missing.push('El correo es obligatorio');
    // if (!username) missing.push('El usuario es obligatorio');
    // if (!password) missing.push('La contraseña es obligatoria');
    if (missing.length) {
      show('Faltan Datos', missing, undefined, 'error');
      return;
    }

    setLoading(true);
    try {
      const r = await api.post('/users', { username, password, name, email });
      const d = r?.data || {};
      if (d?.token) await AsyncStorage.setItem('token', String(d.token));
      if (d?.id) await AsyncStorage.setItem('userId', String(d.id));
      dispatch({ type: types.login, payload: d?.user || { name: username } });

      const successMsg = d?.message || 'Registro exitoso';
      show('Cuenta creada', successMsg, [{ text: 'Ir al Home', onPress: () => router.replace({ pathname: '/(app)/home', params: { userId: String(d.id) } }) }], 'success');
    } catch (e) {
      const lines = errorLines(e);
      show('Faltan Datos', lines.length ? lines : ['No se pudo registrar'], undefined, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={{ alignItems: 'center', paddingVertical: sp(styles.gapXL) }}>
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
            <Button label="Crear cuenta" fallbackLabel="Registrando..." onPress={handleRegister} disabled={loading} />
            <Button label="Cancelar" fallbackLabel="Cancelando..." onPress={() => router.push('/(public)/login')} />
          </View>
        </View>
      </ScrollView>

      <AppAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message} // string o array -> bullets si es array
        buttons={alert.buttons}
        type={alert.type} // 'error' | 'success' | 'info'
        btnColor={colors.black} // botón oscuro, ancho completo
        onClose={hide}
      />
    </>
  );
}
