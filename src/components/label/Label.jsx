import { StyleSheet, Text } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { fs, sp } from '../../assets/styles/screen';
import { styles } from '../../assets/styles/styles';

export const Label = ({ children }) => <Text style={s.label}>{children}</Text>;

const s = StyleSheet.create({
  label: {
    color: colors.hint,
    fontSize: fs(styles.subtitle),
    textAlign: 'center',
    marginVertical: sp(styles.gapLg),
    fontFamily: 'Itim_400Regular',
  },
});
