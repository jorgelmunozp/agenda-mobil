import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fs } from '../../../src/dimensions';
import { colors } from '../../theme/colors';

export const TimeInput = ({ value, onChange, style, inputStyle }) => {
  const [show, setShow] = useState(false);
  const [inner, setInner] = useState(new Date());

  const fmt = (d) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const handleChange = (_, selected) => {
    setShow(false);
    if (selected) {
      setInner(selected);
      onChange?.(fmt(selected));
    }
  };

  // ===== WEB =====
  if (Platform.OS === 'web') {
    const webStyle = StyleSheet.flatten([stylesWeb.input, style, inputStyle]);

    return (
      // 👇 elemento HTML real, NO TextInput
      <input type="time" value={value || ''} onChange={(e) => onChange?.(e.target.value)} style={webStyle} />
    );
  }

  // ===== MOBILE (lo que ya tenías y funciona) =====
  return (
    <View style={style}>
      <Pressable onPress={() => setShow(true)} style={[s.input, inputStyle]}>
        <Text style={s.text}>{value || 'Hora'}</Text>
      </Pressable>
      {show && <DateTimePicker value={inner} mode="time" display="default" onChange={handleChange} />}
    </View>
  );
};

const s = StyleSheet.create({
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: fs(16),
    textAlign: 'center',
  },
});

const stylesWeb = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    color: '#000',
    textAlign: 'center',
  },
});

export default TimeInput;
