import { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { DateInput } from '../../../src/components/input/DateInput';
import { Input } from '../../../src/components/input/Input';
import { TimeInput } from '../../../src/components/input/TimeInput';
import { Button } from '../../../src/components/button/Button';
import { api } from '../../../src/services/api/api';
import { sp } from '../../../src/dimensions';
import { colors } from '../../../src/theme/colors';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

export const AddTask = ({ userId, visible, setModal, onClose, onSaved }) => {
  const [item, setItem] = useState({ name: '', date: '', time: '', message: '' });
  const [saving, setSaving] = useState(false);

  const handleChange = (k, v) => setItem((prev) => ({ ...prev, [k]: v }));

  const handleNewTask = async () => {
    if (!item.name || !item.date || !item.time) return;

    try {
      setSaving(true);

      const response = await api.post(`${usersEndpoint}/${userId}/tasks`, item);

      if (typeof onSaved === 'function') {
        await onSaved();
      }

      setItem({ name: '', date: '', time: '', message: '' });
      setModal(false);
    } catch (e) {
      console.log('Error creating task: ', e?.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.modal}>
          {saving ? (
            <View style={s.loadingBox}>
              <ActivityIndicator size="large" color={colors.black} />
              <Text style={s.loadingText}>Guardando…</Text>
            </View>
          ) : (
            <>
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

              <View style={s.actions}>
                <Button label={'Guardar'} onPress={handleNewTask} backgroundColor={colors.black} disabled={saving} />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.35)',
    justifyContent: 'center',
    padding: sp(5),
  },
  modal: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    padding: 16,
    width: '96%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  label: {
    color: '#0f172a',
    fontFamily: 'Itim_400Regular',
    marginTop: 6,
    fontSize: 12,
  },
  field: {
    width: '100%',
    alignSelf: 'stretch',
    marginBottom: 14,
  },
  inputFull: { width: '100%' },
  inputSingle: { height: sp(80) },
  inputMultiline: { height: sp(180), textAlignVertical: 'top' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12  
  },
  loadingBox: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddTask;
