import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useContext } from "react";
import { AuthContext } from '../../services/auth/authContext';
import { sp, fs } from '../../../src/dimensions';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons';
import { useMenu } from '../../hooks/useMenu';

const S = { logo:42, gapXL:20, bar:10 };

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { toggleMenu } = useMenu();

  return (
    <View style={styles.header}>
      <View style={s.container}>
        <Text style={[s.title, { color: colors.white }]}>Organize</Text>
        <Text style={[s.title, { color: colors.blue, paddingRight: sp(4), overflow: 'visible' }]}>U</Text>
      </View>

      {/* Icono Menú */}
      {user && (
        <Pressable onPress={toggleMenu} style={[s.menu]}>
          <Feather name="menu" size={28} color="#fff" />
        </Pressable>
      )}

      {/* Linea negra horizontal */}
      <View style={{ height: sp(S.bar), backgroundColor: colors.black, width: '100%', alignSelf: 'center', marginVertical: sp(S.gapXL), borderRadius: sp(2) }} />
    </View>
  );
};

const s = StyleSheet.create({
  container: { position: 'relative', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: sp(8), marginTop: sp(40), marginBottom: sp(6) },
  title: { fontSize: fs(S.logo), fontFamily: 'CarterOne_400Regular', top: sp(10), includeFontPadding: false, textShadowColor: 'rgba(0,0,0,0.45)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: Platform.OS === 'android' ? sp(1) : 0 },
  menu: { position: 'absolute', left: sp(15), top: sp(60), zIndex: 1, padding: 6, borderColor: 'transparent' },
});
