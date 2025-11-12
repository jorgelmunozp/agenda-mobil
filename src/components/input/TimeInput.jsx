import { Feather } from '@expo/vector-icons';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

export const TimeInput = ({ value, onChange, placeholder = '-- : --  -----', style, inputStyle, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[s.wrap, style]}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .time-native::-webkit-calendar-picker-indicator{ margin-right:6px; }
          .time-native::-webkit-datetime-edit{ padding:0; }
        `,
          }}
        />
        <input class="time-native" type="time" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} {...props} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #E5E7EB', padding: '0 12px', backgroundColor: '#FFF', boxSizing: 'border-box', outline: 'none' }} />
      </View>
    );
  }

  return (
    <View style={[s.wrap, style]}>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} {...props} style={[s.input, inputStyle]} />
      {Platform.OS !== 'web' && <Feather name="clock" size={18} color="#111827" style={s.icon} pointerEvents="none" />}
    </View>
  );
};

const s = StyleSheet.create({
  wrap: { position: 'relative', width: '100%', alignSelf: 'stretch' },
  input: { width: '100%', height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, paddingRight: 36, backgroundColor: '#FFF', ...Platform.select({ web: { outlineStyle: 'none' } }) },
  icon: { position: 'absolute', right: 10, top: '50%', marginTop: -9 },
});
