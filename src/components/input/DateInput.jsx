import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme/colors';

export const DateInput = ({ value, onChange, style, inputStyle }) => {
  const [show, setShow] = useState(false);
  const [inner, setInner] = useState(value ? new Date(value) : new Date());

  const fmt = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleChange = (_, selected) => {
    setShow(false);
    if (selected) {
      setInner(selected);
      onChange?.(fmt(selected));
    }
  };

  if (Platform.OS === 'web') {
    return (
      <TextInput
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={[stylesWeb.input, style, inputStyle]}
        type="date"
      />
    );
  }

  // Mobile: abrimos el picker nativo
  return (
    <View style={style}>
      <Pressable onPress={() => setShow(true)} style={[s.input, inputStyle]}>
        <Text style={s.text}>{value || 'Fecha'}</Text>
      </Pressable>
      {show && <DateTimePicker value={inner} mode="date" display="default" onChange={handleChange} />}
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
    fontSize: 14,
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
  },
});

export default DateInput;
