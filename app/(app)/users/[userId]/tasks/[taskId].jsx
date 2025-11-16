import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../../../src/components/button/Button';
import { Title } from '../../../../../src/components/title/Title';
import { Loading } from '../../../../../src/components/loading/Loading';
import { sp } from '../../../../../src/dimensions';
import { api } from '../../../../../src/services/api/api';
import { colors } from '../../../../../src/theme/colors';
import { styles } from '../../../../../src/theme/styles';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

export default function Task() {
  const { userId, taskId } = useLocalSearchParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`${usersEndpoint}/${userId}/tasks/${taskId}`);
        setTask(response?.data?.task || {});
      } catch (e) {
        console.log('task', e?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, taskId]);

  // Loading fallback
   if (loading) {
    return <Loading label={'Cargando tarea... '} />;
  }

  return (
    <ScrollView style={styles.box} contentContainerStyle={{ alignItems: 'center', paddingVertical: sp(styles.gapXL) }}>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: sp(30), marginBottom: sp(30) }}>
          <Feather name="star" size={36} color={colors.white} style={{ marginRight: 28 }} />
          <View style={{ display: 'flex', backgroundColor: '#28053f', borderRadius: sp(12), paddingHorizontal: sp(8), paddingBottom: sp(8) }}>
            <Text style={[s.label, { color: colors.white, paddingVertical: sp(1) }]}>{'Fecha de entrega:'}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#28053f', borderRadius: sp(12) }}>
              <Text style={[s.h, { backgroundColor: colors.lightgray, borderRadius: sp(8) }]}>{task?.date || ''}</Text>
              <Text style={[s.h, { backgroundColor: colors.lightgray, borderRadius: sp(8), marginLeft: sp(12) }]}>{task?.time || ''}</Text>
            </View>
          </View>
        </View>

        <Title>{task?.name || ''}</Title>
        <Text style={[s.h, { color: colors.white, fontSize: sp(32), fontStyle: 'italic' }]}>{task?.message || ''}</Text>

        <Button label="Regresar" fallbackLabel="Regresando..." onPress={() => router.replace({ pathname: '/(app)/home', params: { userId: userId } })} backgroundColor={colors.button} />
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  box: { flex: 1, padding: 20, backgroundColor: colors.bg },
  p: { color: '#6b7280' },
  h: { fontSize: 12, marginTop: 8, padding: 6, textAlign: 'center' },
  label: { fontSize: 10, marginTop: 6, padding: 6, textAlign: 'center' },
});
