import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../src/components/button/Button';
import { sp } from '../src/dimensions';
import { colors } from '../src/styles/colors';

export default function NotFound() {
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <View style={s.box}>
      <View style={s.card}>
        <Feather name="alert-triangle" size={48} color={colors.white} style={{ marginBottom: sp(8) }} />
        <Text style={s.title}>404</Text>
        <Text style={s.subtitle}>Página no encontrada</Text>
        <Text style={s.desc}>La ruta que intentas abrir no existe o cambió de lugar.</Text>
        <Button label={'🡠  Volver'} onPress={goBack} backgroundColor={colors.black} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, padding: sp(20) },
  card: { width: '100%', maxWidth: 520, alignItems: 'center', backgroundColor: colors.primary, borderRadius: 16, padding: sp(24), ...Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 8 } }, android: { elevation: 8 }, web: { boxShadow: '0 12px 32px rgba(0,0,0,.25)' } }) },
  title: { fontSize: 48, fontWeight: '800', color: colors.white, letterSpacing: 1 },
  subtitle: { marginTop: 4, fontSize: 18, fontWeight: '700', color: colors.white },
  desc: { marginTop: 8, textAlign: 'center', color: colors.white, opacity: 0.9 },
  btn: { marginTop: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.black, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  btnPressed: Platform.select({ ios: { opacity: 0.85 }, android: { opacity: 0.9 } }),
  btnText: { color: colors.white, fontWeight: '700', marginLeft: 8 },
});
