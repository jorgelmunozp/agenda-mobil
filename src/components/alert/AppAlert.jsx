import { Ionicons } from '@expo/vector-icons';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

const VARIANT = {
  error: { icon: 'close', iconColor: '#f27474', ring: '#f27474', accent: '#ef4444' }, // rojo
  success: { icon: 'checkmark', iconColor: '#22c55e', ring: '#86efac', accent: '#22c55e' }, // verde
  info: { icon: 'information', iconColor: '#3b82f6', ring: '#93c5fd', accent: '#3b82f6' }, // azul
};

export const AppAlert = ({ visible, title, message, onClose, buttons, type = 'info', btnColor = colors.black }) => {
  const v = VARIANT[type] ?? VARIANT.info;

  const btns = buttons?.length ? buttons : [{ text: 'Aceptar', onPress: onClose }];

  const lines = Array.isArray(message)
    ? message.filter(Boolean)
    : String(message || '')
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={S.overlay}>
        <View style={S.card}>
          <View style={S.iconWrap}>
            <View style={[S.iconCircle, { borderColor: v.ring }]}>
              <Ionicons name={v.icon} size={70} color={v.iconColor} />
            </View>
          </View>

          {title ? <Text style={S.title}>{title}</Text> : null}

          {lines.length > 1 ? (
            <View style={S.list}>
              {lines.map((t, i) => (
                <View key={i} style={S.li}>
                  <View style={[S.dot, { backgroundColor: v.accent }]} />
                  <Text style={[S.liText, { color: v.accent }]}>{t}</Text>
                </View>
              ))}
            </View>
          ) : lines[0] ? (
            <Text style={S.msg}>{lines[0]}</Text>
          ) : null}

          <View style={S.actions}>
            {btns.map((b, i) => (
              <Pressable
                key={i}
                style={[S.btn, { backgroundColor: btnColor }]}
                onPress={() => {
                  b.onPress?.();
                  onClose?.();
                }}>
                <Text style={S.btnText}>{b.text}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const S = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,.35)', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 20, width: '90%', maxWidth: 520, alignSelf: 'center', ...Platform.select({ web: { outlineStyle: 'none' } }) },
  iconWrap: { alignItems: 'center', marginTop: 18, marginBottom: 10 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },

  title: { fontSize: 24, fontWeight: '600', color: '#4b5563', textAlign: 'center', marginTop: 18, marginBottom: 20 },
  msg: { fontSize: 16, color: '#111827', textAlign: 'center', lineHeight: 22, marginBottom: 6 },

  list: { gap: 8, marginBottom: 6 },
  li: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
  liText: { flex: 1, fontSize: 14, lineHeight: 26 },

  actions: { marginTop: 32 },
  btn: { width: '100%', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
