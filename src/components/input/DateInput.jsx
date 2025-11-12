import { Feather } from '@expo/vector-icons';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const parseDMY = (s) => {
  if (!s) return null;
  const [dd, mm, yyyy] = (s || '').split('/');
  const d = new Date(+yyyy, +mm - 1, +dd);
  return Number.isNaN(d.getTime()) ? null : d;
};
const toIso = (s) => {
  const d = parseDMY(s);
  return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : '';
};
const fromIso = (iso) => {
  if (!iso) return '';
  const [y, m, d] = (iso || '').split('-');
  return `${d}/${m}/${y}`;
};

export const DateInput = ({ value, onChange, placeholder = 'dd/mm/aaaa', style, inputStyle, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[s.wrap, style]}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .date-native::-webkit-calendar-picker-indicator{ margin-right:6px; }
          .date-native::-webkit-datetime-edit{ padding:0; }
        `,
          }}
        />
        <input class="date-native" type="date" value={toIso(value)} onChange={(e) => onChange(fromIso(e.target.value))} placeholder={placeholder} {...props} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #E5E7EB', padding: '0 12px', backgroundColor: '#FFF', boxSizing: 'border-box', outline: 'none' }} />
      </View>
    );
  }

  return (
    <View style={[s.wrap, style]}>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} {...props} style={[s.input, inputStyle]} />
      {Platform.OS !== 'web' && <Feather name="calendar" size={18} color="#111827" style={s.icon} pointerEvents="none" />}
    </View>
  );
};

const s = StyleSheet.create({
  wrap: { position: 'relative', width: '100%', alignSelf: 'stretch' },
  input: { width: '100%', height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, paddingRight: 36, backgroundColor: '#FFF', ...Platform.select({ web: { outlineStyle: 'none' } }) },
  icon: { position: 'absolute', right: 10, top: '50%', marginTop: -9 },
});
