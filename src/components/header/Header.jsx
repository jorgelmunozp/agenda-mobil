import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { fs, sp } from '../../../src/dimensions';
import { useMenu } from '../../hooks/useMenu';
import { AuthContext } from '../../services/auth/authContext';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';
import { Logo } from '../logo/Logo';

const S = { logo: 42, gapXL: 20 };

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { toggleMenu } = useMenu();
  const backgroundClass = user ? { backgroundColor: colors.lightgray } : { backgroundColor: colors.primary };
  const titleClass = user ? { color: colors.black, fontSize: fs(20), marginTop: sp(10) } : { color: colors.white, fontSize: fs(42) };
  const uClass = user ? { color: colors.blue, fontSize: fs(20), marginTop: sp(10) } : { color: colors.blue, fontSize: fs(42) };

  return (
    <View style={styles.header}>
      <View style={[s.container, backgroundClass]}>
        <Text style={[s.title, titleClass]}>Organize</Text>
        <Text style={[s.title, uClass, { paddingRight: sp(4), overflow: 'visible' }]}>U</Text>
        {user && <Logo width={25} height={25} color={s.logo.color} style={s.logo} />}
      </View>

      {/* Icono Menú */}
      {user && (
        <Pressable onPress={toggleMenu} style={s.menu}>
          <Feather name="menu" size={26} color={colors.black} />
        </Pressable>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: { position: 'relative', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: sp(8), marginTop: sp(40), paddingBottom: sp(30), borderBottomColor: colors.black, borderBottomWidth: 10 },
  title: { fontFamily: 'CarterOne_400Regular', top: sp(10), includeFontPadding: false, textShadowColor: 'rgba(0,0,0,0.45)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: Platform.OS === 'android' ? sp(1) : 0 },
  menu: { position: 'absolute', left: sp(10), top: sp(60), zIndex: 1, padding: 6 },
  logo: { color: colors.primary, position: 'absolute', right: sp(10), top: sp(25) },
});
