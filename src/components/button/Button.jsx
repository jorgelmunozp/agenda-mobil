import { Pressable, StyleSheet, Text } from 'react-native';
import { fs, sp } from '../../../src/dimensions';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';

export const Button = (props) => (
  <Pressable style={[s.button, { backgroundColor: props.backgroundColor, height: sp(styles.btnH), borderRadius: sp(styles.radius), borderColor: props.borderColor, borderWidth: props.borderWidth, borderStyle: props.borderStyle }]} onPress={props.onPress} disabled={props.disabled}>
    <Text style={s.label}>{props.disabled ? props.fallbackLabel : props.label}</Text>
  </Pressable>
);

const s = StyleSheet.create({
  button: { alignItems: 'center', justifyContent: 'center', marginTop: 8, width: '100%' },
  label: { color: colors.white, fontSize: fs(14), fontWeight: '800' },
});
