import { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing, Platform, StyleSheet as RNStyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../services/auth/authContext';
import { colors } from '../../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useMenu } from '../../hooks/useMenu';
import { styles } from '../../theme/styles';

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
          <View style={s.topWrap}>
            <View style={s.topLine} />
            <Pressable onPress={closeMenu} hitSlop={12} style={s.closeBtn}>
              <Feather name="x" size={20} color={colors.primary} />
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
  menu: { backgroundColor: '#fff', padding: 16, width: '100%', flex: 1 },
  topWrap: { position: 'relative', height: 32, marginBottom: 32, justifyContent: 'center' },
  topLine: { position: 'absolute', left: 12, right: 12, bottom: 0, height: 1, borderRadius: 2, backgroundColor: colors.primary },
  closeBtn: { position: 'absolute', right: 6, top: 0, bottom: 0, justifyContent: 'center', padding: 4, backgroundColor: 'transparent', zIndex: 3 },
  item: { paddingVertical: 12 },
  rowInner: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, gap: 10 },
  text: { color: '#111827', fontSize: 14 },
});
