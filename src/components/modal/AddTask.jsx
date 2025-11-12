import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { DateInput } from '../input/DateInput';
import { Input } from '../input/Input';
import { TimeInput } from '../input/TimeInput';

export const AddTask = ({ visible, onClose, form, onChange, onSave }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.modal}>
          <Text style={s.label}>Nombre</Text>
          <View style={s.field}>
            <Input value={form.name} onChangeText={(v) => onChange('name', v)} isIcon={false} placeholder="Nombre" style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Fecha</Text>
          <View style={s.field}>
            <DateInput value={form.date} onChange={(v) => onChange('date', v)} style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Hora</Text>
          <View style={s.field}>
            <TimeInput value={form.time} onChange={(v) => onChange('time', v)} style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Mensaje</Text>
          <View style={s.field}>
            <Input value={form.message} onChangeText={(v) => onChange('message', v)} isIcon={false} placeholder="Mensaje" multiline style={s.inputFull} inputStyle={s.inputMultiline} />
          </View>

          <View style={s.modalActions}>
            <Pressable onPress={onSave} style={s.primaryBtn}>
              <Text style={s.primaryText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,.35)', justifyContent: 'center', padding: 20 },
  modal: { backgroundColor: colors.bg, borderRadius: 16, padding: 16, width: '90%', maxWidth: 900, alignSelf: 'center', ...Platform.select({ web: { outlineStyle: 'none' } }) },
  label: { color: '#0f172a', fontWeight: '600', marginTop: 6, fontSize: 12 },
  field: { width: '100%', alignSelf: 'stretch', marginBottom: 14 },
  inputFull: { width: '100%' },
  inputSingle: { height: 48, minHeight: 48, paddingVertical: 12 },
  inputMultiline: { minHeight: 120, textAlignVertical: 'top', paddingTop: 12, paddingBottom: 12 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  primaryBtn: { backgroundColor: colors.black, borderRadius: 10, paddingVertical: 16, width: '100%', alignItems: 'center' },
  primaryText: { color: colors.white, fontWeight: '700' },
});

export default AddTask;
