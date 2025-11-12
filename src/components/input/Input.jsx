import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View, Platform } from 'react-native';
import { fs, sp } from '../../../src/dimensions';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';

export const Input = ({ value, onChangeText, placeholder, style, inputStyle, isIcon = false, icon = 'person', placeholderTextColor = '#9CA3AF', ...props }) => (
  <View style={[s.wrap, { height: sp(styles.inputH) }, style]}>
    {isIcon && <Ionicons name={icon} size={fs(styles.icon)} color={colors.black} style={s.icon} />}
    <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={placeholderTextColor} {...props} style={[s.input, isIcon && { paddingLeft: fs(styles.icon) + 26 }, inputStyle]} />
  </View>
);

const s = StyleSheet.create({
  wrap: { position: 'relative', width: '100%', alignSelf: 'stretch', backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: '#d3d3d3' },
  input: { fontSize: fs(16), height: '100%', textAlign:'center', paddingHorizontal: 12, textAlignVertical: 'center', backgroundColor: 'transparent', color: '#000', borderWidth: 0, borderRadius: 12, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  icon: { position: 'absolute', left: 14, top: (sp(styles.inputH) - fs(styles.icon)) / 2 },
});
