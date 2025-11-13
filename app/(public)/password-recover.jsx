import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppAlert } from '../../src/components/alert/AppAlert';
import { Button } from '../../src/components/button/Button';
import { Input } from '../../src/components/input/Input';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';
import { sp } from '../../src/dimensions';
import { api } from '../../src/services/api/api';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';
import { errorLines } from '../../src/helpers/errorLines';

const passwordRecoverEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_PASSWORD_RECOVER;

export default function PasswordRecover() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    type: 'info',
  });

  const show = (title, message, buttons, type = 'info') =>
    setAlert({
      visible: true,
      title,
      message,
      buttons: buttons?.length ? buttons : [{ text: 'Aceptar' }],
      type,
    });
  const hide = () => setAlert((a) => ({ ...a, visible: false }));

  const sendEmail = async () => {
    // Validación local
    if (!email) {
      show('Recuperar contraseña', 'El correo es obligatorio', undefined, 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(passwordRecoverEndpoint, { email }, { headers: { 'x-client': 'mobile' } });
      const successMsg = response?.data?.message || 'Te enviamos el enlace de recuperación a tu correo.';
      show('Listo', successMsg, [{ text: 'Ir al Login', onPress: () => router.replace('/(public)/login') }], 'success');
    } catch (e) {
      const lines = errorLines(e);
      show('Faltan Datos', lines.length ? lines : 'No se pudo enviar el correo de recuperación', undefined, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Title>RECUPERAR CONTRASEÑA</Title>

          <Label>Correo</Label>
          <Input value={email} onChangeText={setEmail} isIcon={true} icon="at" keyboardType="email-address" autoCapitalize="none" />

          <View style={styles.actions}>
            <Button label="Enviar enlace" fallbackLabel="Enviando..." onPress={sendEmail} disabled={loading} />
            <Button label="Cancelar" fallbackLabel="Cancelando..." onPress={() => router.push('/(public)/login')} />
          </View>
        </View>
      </ScrollView>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hide} />
    </>
  );
}
