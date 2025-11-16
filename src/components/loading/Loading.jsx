import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';

export const Loading = ({ label = 'Cargando…' }) => {
  return (
    <View style={[styles.box, s.container]}>
      <ActivityIndicator size="large" color={colors.white} />
      <Text style={s.text}>{label}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { marginTop: 8, color: colors.text },
});
