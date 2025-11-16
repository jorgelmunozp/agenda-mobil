import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { fs, sp } from '../../assets/styles/screen';
import { styles } from '../../assets/styles/styles';

export const Title = ({ children }) => (
  <View style={s.wrap}>
    <Text style={s.txt}>{children}</Text>
  </View>
);

const s = StyleSheet.create({
  wrap: { marginBottom: 16 },
  txt: {
    fontSize: fs(styles.title),
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Itim_400Regular',
    marginBottom: sp(styles.gap),
    textAlign: 'center',
  },
});
