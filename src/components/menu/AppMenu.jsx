import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet as RNStyleSheet, StyleSheet, Text, View } from 'react-native';
import { useMenu } from '../../hooks/useMenu';
import { AuthContext } from '../../services/auth/authContext';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';
import { Logo } from '../logo/Logo';

const WIDTH = 320;
const DURATION = 360;
const HEADER_HEIGHT = styles.header.height;
const MENU_TOP = HEADER_HEIGHT;

export const AppMenu = () => {
  const { open, closeMenu } = useMenu();
  const { user, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const tx = useRef(new Animated.Value(-WIDTH)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      if (!mounted) setMounted(true);
      Animated.parallel([Animated.timing(fade, { toValue: 1, duration: DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }), Animated.timing(tx, { toValue: 0, duration: DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true })]).start();
    } else if (mounted) {
      Animated.parallel([Animated.timing(fade, { toValue: 0, duration: DURATION, easing: Easing.in(Easing.cubic), useNativeDriver: true }), Animated.timing(tx, { toValue: -WIDTH, duration: DURATION, easing: Easing.in(Easing.cubic), useNativeDriver: true })]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [open, mounted, fade, tx]);

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({ type: 'logout' });
    router.replace('/(public)/login');
    closeMenu();
  };

  if (!mounted) return null;

  const go = (href) => {
    closeMenu();
    router.replace(href);
  };

  const homeHref = user?.id ? `/(app)/home?userId=${encodeURIComponent(String(user.id))}` : '/(app)/home';

  const Row = ({ icon, label, onPress }) => {
    const shift = useRef(new Animated.Value(0)).current;
    const animateTo = (v) => {
      Animated.timing(shift, { toValue: v, duration: 160, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    };
    return (
      <Pressable onPress={onPress} onHoverIn={() => animateTo(6)} onHoverOut={() => animateTo(0)} onPressIn={() => animateTo(10)} onPressOut={() => animateTo(0)} style={s.item}>
        <Animated.View style={{ transform: [{ translateX: shift }] }}>
          <View style={s.rowInner}>
            <Feather name={icon} size={18} color={colors.primary} />
            <Text style={s.text}>{label}</Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: MENU_TOP, zIndex: 9999 }}>
      <Pressable onPress={closeMenu} style={RNStyleSheet.absoluteFillObject}>
        <Animated.View style={[s.backdrop, { opacity: fade }]} />
      </Pressable>

      <Animated.View style={[s.panel, { width: WIDTH, transform: [{ translateX: tx }] }]}>
        <View style={s.menu}>
          <View style={s.header}>
            <Logo width={25} height={25} color={s.logo.color} style={s.logo} />
            <Pressable onPress={closeMenu} hitSlop={12} style={s.closeBtn}>
              <Feather name="x" size={23} color={colors.primary} />
            </Pressable>
          </View>

          <Row icon="home" label="Tareas " onPress={() => go(homeHref)} />
          <Row icon="user" label="Nosotros " onPress={() => go('/(app)/about-us')} />
          <Row icon="phone" label="Contacto " onPress={() => go('/(app)/contact')} />
          <Row icon="log-out" label="Cerrar sesión " onPress={logout} />
        </View>
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  backdrop: { ...RNStyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.35)' },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    ...Platform.select({
      android: { elevation: 8 },
      ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
    }),
  },
  menu: { backgroundColor: '#ddd', paddingVertical: 18, paddingHorizontal: 26, width: '100%', flex: 1 },
  header: { position: 'relative', display: 'flex', flexDirection: 'row', height: 32, marginBottom: 32, paddingBottom: 64, alignItems: 'center', justifyContent: 'space-between', borderBottomColor: colors.primary, borderBottomWidth: 2 },
  logo: { color: colors.primary, position: 'absolute', left: 0 },
  closeBtn: { position: 'absolute', right: 0 },
  item: { paddingVertical: 12 },
  rowInner: { flexDirection: 'row', alignItems: 'center', marginLeft: 6, gap: 10 },
  text: { fontFamily: 'Itim_400Regular', color: '#111827', fontSize: 14, fontWeight: '600' },
});
