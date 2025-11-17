import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { styles } from '../../assets/styles/styles';

export const Loading = ({ label = 'Cargando…' }) => {
  return (
    <View style={[styles.box, s.container]}>
      <ActivityIndicator size="large" color={colors.white} />
      <Text style={s.text}>{label}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 12, margin: 0, padding: 0 },
  text: { marginTop: 8, color: colors.white },
});
