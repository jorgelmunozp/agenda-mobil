import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { DateInput } from '../../../src/components/input/DateInput';
import { Input } from '../../../src/components/input/Input';
import { TimeInput } from '../../../src/components/input/TimeInput';
import { api } from '../../../src/services/api/api';
import { sp } from '../../../src/dimensions';
import { colors } from '../../../src/theme/colors';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

const handleNewTask = async (userId, item, setModal, setItem, onSaved) => {
  if (!item.name || !item.date || !item.time) return;

  try {
    const token = await AsyncStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await api.post(`${usersEndpoint}/${userId}/tasks`, item, { headers });
    const data = response?.data || {};
    console.log('Created task:', data);

    // Refrescar lista en Home
    if (typeof onSaved === 'function') {
      await onSaved();
    }

    // Limpiar formulario y cerrar modal
    setItem({ name: '', date: '', time: '', message: '' });
    setModal(false);
  } catch (e) {
    console.log('create task', e?.message);
  }
};

export const AddTask = ({ userId, visible, setModal, onClose, onSaved }) => {
  const [item, setItem] = useState({ name: '', date: '', time: '', message: '' });
  const handleChange = (k, v) => setItem((prev) => ({ ...prev, [k]: v }));

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.modal}>
          <Text style={s.label}>Nombre</Text>
          <View style={s.field}>
            <Input value={item.name} onChangeText={(v) => handleChange('name', v)} isIcon={false} placeholder="Nombre" style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Fecha</Text>
          <View style={s.field}>
            <DateInput value={item.date} onChange={(v) => handleChange('date', v)} style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Hora</Text>
          <View style={s.field}>
            <TimeInput value={item.time} onChange={(v) => handleChange('time', v)} style={s.inputFull} inputStyle={s.inputSingle} />
          </View>

          <Text style={s.label}>Mensaje</Text>
          <View style={s.field}>
            <Input value={item.message} onChangeText={(v) => handleChange('message', v)} isIcon={false} placeholder="Mensaje" multiline style={s.inputFull} inputStyle={s.inputMultiline} />
          </View>

          <View style={s.modalActions}>
            <Pressable onPress={() => handleNewTask(userId, item, setModal, setItem, onSaved)} style={s.primaryBtn}>
              <Text style={s.primaryText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,.35)', justifyContent: 'center', padding: sp(5) },
  modal: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 900,
    alignSelf: 'center',
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  label: { color: '#0f172a', fontWeight: '600', marginTop: 6, fontSize: 12 },
  field: { width: '100%', alignSelf: 'stretch', marginBottom: 14 },
  inputFull: { width: '100%' },
  inputSingle: { height: sp(80) },
  inputMultiline: { height: sp(180), textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  primaryBtn: { backgroundColor: colors.black, borderRadius: 10, paddingVertical: 16, width: '100%', alignItems: 'center' },
  primaryText: { color: colors.white, fontWeight: '700' },
});

export default AddTask;
