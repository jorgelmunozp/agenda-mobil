// src/components/input/TimeInput.jsx
import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const TimeInput = ({
  value,
  onChange,
  placeholder = '-- : --  -----',
  style,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[s.wrap, style]}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        {...props}
        style={[s.input, inputStyle]}
      />
      <Feather
        name="clock"
        size={18}
        color="#111827"
        style={s.icon}
        pointerEvents="none"
      />
    </View>
  );
};

const s = StyleSheet.create({
  wrap: { position: 'relative', width: '100%', alignSelf: 'stretch' },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingRight: 36,         // espacio para el icono
    backgroundColor: '#FFF',
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  icon: { position: 'absolute', right: 10, top: '50%', marginTop: -9 },
});
