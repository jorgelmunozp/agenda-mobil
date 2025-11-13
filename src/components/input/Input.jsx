import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View, Platform } from 'react-native';
import { fs, sp } from '../../../src/dimensions';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';

export const Input = ({ value, onChangeText, placeholder, style, inputStyle, isIcon = false, icon = 'person', placeholderTextColor = '#9CA3AF', multiline = false, ...props }) => {
  const wrapperSize = multiline
    ? { minHeight: sp(styles.inputH) } // Aumenta si es multiline
    : { height: sp(styles.inputH) };

  return (
    <View style={[s.wrap, wrapperSize, style]}>
      {isIcon && <Ionicons name={icon} size={fs(styles.icon)} color={colors.black} style={s.icon} />}

      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={placeholderTextColor} multiline={multiline} numberOfLines={multiline ? props.numberOfLines || 4 : 1} {...props} style={[s.input, isIcon && { paddingLeft: fs(styles.icon) + 26 }, multiline && s.inputMultiline, inputStyle]} />
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    position: 'relative',
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  input: {
    fontSize: fs(16),
    height: '100%',
    textAlign: 'center',
    paddingHorizontal: 12,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    color: '#000',
    borderWidth: 0,
    borderRadius: 12,
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  // sólo se aplica cuando multiline === true
  inputMultiline: {
    height: 'auto',
    textAlignVertical: 'top',
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
  },
  icon: {
    position: 'absolute',
    left: 14,
    top: (sp(styles.inputH) - fs(styles.icon)) / 2,
  },
});
