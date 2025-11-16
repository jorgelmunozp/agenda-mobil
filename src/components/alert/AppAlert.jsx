import { Ionicons } from '@expo/vector-icons';
import { Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { Button } from '../button/Button';

const Icon = {
  error: { icon: 'close', iconColor: '#f27474', ring: '#f27474', accent: '#ef4444' }, // rojo
  success: { icon: 'checkmark', iconColor: '#22c55e', ring: '#86efac', accent: '#22c55e' }, // verde
  info: { icon: 'information', iconColor: '#3b82f6', ring: '#93c5fd', accent: '#3b82f6' }, // azul
};

export const AppAlert = ({ visible, title, message, onClose, type = 'info', btnColor = colors.black }) => {
  const icon = Icon[type] ?? Icon.info;

  const lines = Array.isArray(message)
    ? message.filter(Boolean)
    : String(message || '')
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <ScrollView style={s.overlay} contentContainerStyle={s.box}>
        <View style={s.card}>
          <View style={s.iconWrap}>
            <View style={[s.iconCircle, { borderColor: icon.ring }]}>
              <Ionicons name={icon.icon} size={70} color={icon.iconColor} />
            </View>
          </View>

          {title ? <Text style={s.title}>{title}</Text> : null}

          <View style={s.list}>
            {lines.map((t, i) => (
              <View key={i} style={s.li}>
                <View style={[s.dot, { backgroundColor: icon.accent }]} />
                <Text style={[s.liText, { color: icon.accent }]}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={s.actions}>
            <Button label={'Aceptar'} onPress={() => onClose?.()} backgroundColor={colors.black} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,.35)' },
  box: { flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 20, width: '90%', maxWidth: 520, alignSelf: 'center', ...Platform.select({ web: { outlineStyle: 'none' } }) },
  iconWrap: { alignItems: 'center', marginTop: 18, marginBottom: 10 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },

  title: { fontSize: 18, fontWeight: '600', color: '#4b5563', textAlign: 'center', marginTop: 14, marginBottom: 20 },
  msg: { fontSize: 10, color: '#111827', textAlign: 'center', lineHeight: 22, marginBottom: 6 },

  list: { gap: 8, marginBottom: 6 },
  li: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  liText: { flex: 1, fontSize: 10, lineHeight: 26 },

  actions: { marginTop: 32 },
  btn: { width: '100%', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
