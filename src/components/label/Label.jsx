import { StyleSheet, Text } from 'react-native';
import { fs, sp } from '../../../src/dimensions';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';

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
