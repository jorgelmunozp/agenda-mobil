import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../src/assets/styles/colors';
import { sp } from '../../../src/assets/styles/screen';
import { AppAlert } from '../../../src/components/alert/AppAlert';
import { Button } from '../../../src/components/button/Button';
import { DateInput } from '../../../src/components/input/DateInput';
import { Input } from '../../../src/components/input/Input';
import { TimeInput } from '../../../src/components/input/TimeInput';
import { Loading } from '../../../src/components/loading/Loading';
import { api } from '../../../src/services/api/api';
import { useAlert } from '../../../src/hooks/useAlert';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

export const AddTask = ({ userId, visible, setModal, onClose, onSaved }) => {
  const [item, setItem] = useState({ name: '', date: '', time: '', message: '' });
  const [saving, setSaving] = useState(false);

  const { alert, showSuccess, showError, hideAlert } = useAlert();

  const handleChange = (k, v) => setItem((prev) => ({ ...prev, [k]: v }));

  const handleNewTask = async () => {
    try {
      setSaving(true);

      const response = await api.post(`${usersEndpoint}/${userId}/tasks`, item);

      if (typeof onSaved === 'function') {
        await onSaved();
      }

      setItem({ name: '', date: '', time: '', message: '' });

      if (typeof onClose === 'function') onClose();
      setModal(false);
      showSuccess('Tarea registrada', 'La tarea se guardó correctamente.');

    } catch (e) {
      const msg = e?.response?.data?.error?.message || e.message || 'Error registrando tarea.';
      showError('Error', msg);
      console.log('Error creating task: ', e?.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
        <View style={s.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <View style={s.modal}>
            {saving ? (
              <View style={s.loadingBox}>
                <Loading label={'Registrando tarea... '} />
              </View>
            ) : (
              <View style={s.container}>
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
              </View>
            )}
          </View>
        </View>
      </Modal>

      <AppAlert visible={alert.visible} title={alert.title} message={alert.message} buttons={alert.buttons} type={alert.type} btnColor={colors.black} onClose={hideAlert} />
    </>
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
    width: '96%',
    maxWidth: 900,
    alignSelf: 'center',
    borderRadius: 16,
  },
  container: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
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
    marginTop: 12,
  },
  loadingBox: {
    backgroundColor: colors.bg,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

export default AddTask;
