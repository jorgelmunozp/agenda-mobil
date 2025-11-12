import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { AppAlert } from '../../../src/components/alert/AppAlert';
import { Button } from '../../../src/components/button/Button';
import { Input } from '../../../src/components/input/Input';
import { Label } from '../../../src/components/label/Label';
import { Title } from '../../../src/components/title/Title';
import { sp } from '../../../src/dimensions';
import { errorLines } from '../../../src/helpers/errorLines';
import { api } from '../../../src/services/api/api';
import { colors } from '../../../src/theme/colors';
import { styles } from '../../../src/theme/styles';

export default function PasswordReset() {
  const { token } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ visible: false, title: '', message: '', buttons: [], type: 'info' });
  const show = (title, message, buttons, type = 'info') =>
    setAlert({
      visible: true,
      title,
      message,
      buttons: buttons?.length ? buttons : [{ text: 'Aceptar' }],
      type,
    });
  const hide = () => setAlert((a) => ({ ...a, visible: false }));

  const handleReset = async () => {
    const missing = [];
    if (!password) missing.push('La contraseña es obligatoria');
    if (!token) missing.push('El enlace de recuperación no es válido');

    if (missing.length) {
      show('Faltan datos', missing, undefined, 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.patch('/password/update', { token, newPassword: password });
      const msg = response?.data?.message || 'Contraseña actualizada correctamente';

      show(
        'Contraseña actualizada',
        [msg],
        [
          {
            text: 'Ir al login',
            onPress: () => router.replace('/(public)/login'),
          },
        ],
        'success',
      );
    } catch (e) {
      const lines = errorLines(e);
      show('Error', lines.length ? lines : ['No se pudo actualizar la contraseña'], undefined, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/(public)/login');
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={{ alignItems: 'center', paddingVertical: sp(styles.gapXL) }}>
        <View style={styles.container}>
          <Title>CREAR NUEVA CONTRASEÑA</Title>

          <Label>Contraseña</Label>
          <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" placeholder="Escribe tu nueva contraseña" />

          <View style={styles.actions}>
            <Button label="Confirmar" fallbackLabel="Guardando..." onPress={handleReset} disabled={loading} />
            <Button label="Cancelar" fallbackLabel="Cancelando..." onPress={handleCancel} />
          </View>
        </View>
      </ScrollView>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hide} />
    </>
  );
}
