import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../../../src/assets/styles/colors';
import { styles } from '../../../src/assets/styles/styles';
import { AppAlert } from '../../../src/components/alert/AppAlert';
import { Button } from '../../../src/components/button/Button';
import { Input } from '../../../src/components/input/Input';
import { Label } from '../../../src/components/label/Label';
import { Title } from '../../../src/components/title/Title';
import { errorLines } from '../../../src/helpers/errorLines';
import { api } from '../../../src/services/api/api';
import { useAlert } from '../../../src/hooks/useAlert';

const passwordUpdateEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_PASSWORD_UPDATE;

export default function PasswordReset() {
  const { token } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alert, showSuccess, showError, hideAlert } = useAlert();

  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await api.patch(passwordUpdateEndpoint, {
        token,
        newPassword: password,
      });

      const msg = response?.data?.message || 'Contraseña actualizada correctamente';

      showSuccess(
        'Contraseña actualizada',
        [msg],
        [
          {
            text: 'Ir al login',
            onPress: () => router.replace('/(public)/login'),
          },
        ],
      );
    } catch (e) {
      const lines = errorLines(e);
      const message = lines.length > 0 ? lines : ['No se pudo actualizar la contraseña'];

      showError('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/(public)/login');
  };

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Title>CREAR NUEVA CONTRASEÑA</Title>

          <Label>Contraseña</Label>
          <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" placeholder="Escribe tu nueva contraseña" />

          <View style={styles.actions}>
            <Button label="Confirmar" fallbackLabel="Guardando..." onPress={handleReset} disabled={loading} backgroundColor={colors.button} />
            <Button label="Cancelar" fallbackLabel="Cancelando..." onPress={handleCancel} backgroundColor={colors.button} />
          </View>
        </View>
      </ScrollView>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hideAlert} />
    </>
  );
}
