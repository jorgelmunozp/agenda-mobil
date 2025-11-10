import { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing, Platform, StatusBar, StyleSheet as RNStyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../services/auth/authContext';
import { colors } from '../../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useMenu } from '../../hooks/useMenu';

const WIDTH = 260;
const DURATION = 360;
const HEADER_HEIGHT = 94; // <- alto del Header

export const AppMenu = () => {
  const { open, closeMenu } = useMenu();
  const { dispatch } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);              // <- estado para userId (sin await arriba)

  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Menú arranca debajo del header (safe-area + alto del header)
  const MENU_TOP = (Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight ?? 0)) + HEADER_HEIGHT;

  const tx = useRef(new Animated.Value(-WIDTH)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  // Hidratar userId de AsyncStorage
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (alive) setUserId(id);
      } catch {}
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (open) {
      if (!mounted) setMounted(true);
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(tx,   { toValue: 0, duration: DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 0, duration: DURATION, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(tx,   { toValue: -WIDTH, duration: DURATION, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      ]).start(({ finished }) => { if (finished) setMounted(false); });
    }
  }, [open, mounted, fade, tx]);

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({ type: 'logout' });
    router.replace('/(public)/login');
    closeMenu();
  };

  if (!mounted) return null;

  // Item con empuje suave en hover/press (web) y press (nativo)
  const Row = ({ children, onPress, href }) => {
    const shift = useRef(new Animated.Value(0)).current;
    const to = (v)=>Animated.timing(shift,{toValue:v,duration:160,easing:Easing.out(Easing.cubic),useNativeDriver:true}).start();
    const content = (
      <Pressable onPress={onPress} onHoverIn={()=>to(6)} onHoverOut={()=>to(0)} onPressIn={()=>to(10)} onPressOut={()=>to(0)} style={s.item}>
        <Animated.View style={{ transform:[{ translateX:shift }] }}>{children}</Animated.View>
      </Pressable>
    );
    return href ? <Link href={href} asChild>{content}</Link> : content;
  };

  // Construye el href sólo si tenemos userId
  const homeHref = userId ? `/(app)/home?userId=${encodeURIComponent(userId)}` : '/(app)/home';

  return (
    <View style={{ position:'absolute', left:0, right:0, bottom:0, top:MENU_TOP, zIndex:9999 }}>
      <Pressable onPress={closeMenu} style={RNStyleSheet.absoluteFillObject}>
        <Animated.View style={[s.backdrop, { opacity: fade }]} />
      </Pressable>

      <Animated.View style={[s.panel, { width: WIDTH, transform: [{ translateX: tx }] }]}>
        <View style={s.menu}>
          {/* Topbar */}
          <View style={s.topWrap}>
            <View style={s.topLine} />
            <Pressable onPress={closeMenu} hitSlop={12} style={s.closeBtn}>
              <Feather name="x" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <Row href={homeHref} onPress={closeMenu}>
            <View style={s.rowInner}><Feather name='home' size={18} color={colors.primary}/><Text style={s.text}>Tareas</Text></View>
          </Row>
          <Row href='/(app)/about-us' onPress={closeMenu}>
            <View style={s.rowInner}><Feather name='user' size={18} color={colors.primary}/><Text style={s.text}>Nosotros</Text></View>
          </Row>
          <Row href='/(app)/contact' onPress={closeMenu}>
            <View style={s.rowInner}><Feather name='phone' size={18} color={colors.primary}/><Text style={s.text}>Contacto</Text></View>
          </Row>
          <Row onPress={logout}>
            <View style={s.rowInner}><Feather name='log-out' size={18} color={colors.primary}/><Text style={s.text}>Cerrar sesión</Text></View>
          </Row>
        </View>
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  backdrop:{ ...RNStyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,.35)' },
  panel:{ position:'absolute', left:0, top:0, bottom:0, backgroundColor:'#fff',
    ...Platform.select({ android:{elevation:8}, ios:{shadowColor:'#000',shadowOpacity:.2,shadowRadius:10,shadowOffset:{width:0,height:6}} })
  },
  menu:{ backgroundColor:'#fff', padding:16, width:'100%', flex:1 },
  topWrap:{ position:'relative', height:32, marginBottom:32 },
  topLine:{ position:'absolute', left:12, right:12, top:50, height:1, borderRadius:2, backgroundColor:colors.primary },
  closeBtn:{ position:'absolute', right:6, top:6, zIndex:3, padding:4, backgroundColor:'transparent' },
  item:{ paddingVertical:12 },
  rowInner:{ flexDirection:'row', alignItems:'center', gap:10, marginLeft:10 },
  text:{ color:'#111827', fontSize:16 }
});
