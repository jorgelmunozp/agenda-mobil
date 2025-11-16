import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../src/assets/styles/colors';

const openTask = (userId, taskId) => {
  router.replace({ pathname: '/(app)/users/[userId]/tasks/[taskId]', params: { userId: String(userId), taskId: String(taskId) } });
};

export const TaskItem = ({ item }) => {
  const { userId } = useLocalSearchParams();

  const taskId = item?.id ?? 'id';
  const title = item?.task?.name ?? 'Tarea';
  const date = item?.task?.date ?? 'fecha';
  const time = item?.task?.time ?? 'hora';

  return (
    <Pressable onPress={() => openTask(userId, taskId)} style={({ hovered, pressed }) => [s.card, hovered && s.cardHover, pressed && s.cardPressed]}>
      <Feather name="star" size={18} color={colors.white} style={{ marginRight: 28 }} />
      <View style={{ flex: 1 }}>
        <Text style={s.cardTitle}>{title}</Text>
        {date || time ? <Text style={s.cardMeta}>{[date, time].filter(Boolean).join(' · ')}</Text> : null}
      </View>
    </Pressable>
  );
};

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, padding: 12, marginBottom: 10 },
  cardHover: Platform.select({ web: { boxShadow: '0 3px 5px rgba(0,0,0,.68)', borderRadius: 12 } }),
  cardPressed: Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 8 } }, android: { elevation: 8 } }),
  cardTitle: { fontWeight: '700', fontSize: 14, color: colors.text },
  cardMeta: { color: colors.white, marginTop: 2, fontSize: 12 },
});

export default TaskItem;
