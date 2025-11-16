import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { fs, sp } from '../../assets/styles/screen';
import { styles } from '../../assets/styles/styles';

export const Button = (props) => (
  <Pressable style={[s.button, { backgroundColor: props.backgroundColor, height: sp(styles.btnH), borderRadius: sp(styles.radius), borderColor: props.borderColor, borderWidth: props.borderWidth, borderStyle: props.borderStyle }]} onPress={props.onPress} disabled={props.disabled}>
    <Text style={s.label}>{props.disabled ? props.fallbackLabel : props.label}</Text>
  </Pressable>
);

const s = StyleSheet.create({
  button: { alignItems: 'center', justifyContent: 'center', marginTop: 8, width: '100%' },
  label: { color: colors.white, fontSize: fs(14), fontWeight: '800' },
});
