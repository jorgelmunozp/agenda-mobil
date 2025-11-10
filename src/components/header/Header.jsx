import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useContext } from "react";
import { AuthContext } from '../../services/auth/authContext';
import { sp, fs } from '../../../dimensions';
import { colors } from '../../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useMenu } from '../../hooks/useMenu';

const S = { logo:42, gapXL:20, bar:10 };

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { toggleMenu } = useMenu();

  return (
    <View style={{width:'100%', backgroundColor:colors.primary }}>
      <View style={{position:'relative', flexDirection:'row', alignItems:'flex-end', justifyContent:'center', paddingHorizontal:sp(8), marginBottom:sp(6)}}>
        <Text style={[s.title, { color:colors.white }]}>
          Organize
        </Text>
        <Text style={[s.title, { color:colors.blue, paddingRight:sp(4), overflow:'visible' }]}>
          U
        </Text>
      </View>

      {/* Icono Menú */}
      { user && ( <Pressable onPress={toggleMenu} style={[s.menu]}>
                    <Feather name="menu" size={22} color="#fff"/>
                  </Pressable> )
      }

      {/* Linea negra horizontal */}
      <View style={{height:sp(S.bar), backgroundColor:colors.black, width:'100%', alignSelf:'center', marginVertical:sp(S.gapXL), borderRadius:sp(2)}}/>
    </View>
  );
};

const s = StyleSheet.create({
  bar:{ height:60, backgroundColor:colors.primary, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:12, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:8, elevation:3 },
  title:{ fontSize:fs(S.logo), fontFamily:'CarterOne_400Regular', top:sp(10), includeFontPadding:false, textShadowColor:'rgba(0,0,0,0.45)', textShadowOffset: { width:0, height:1 }, textShadowRadius: Platform.OS === 'android' ? sp(1) : 0 },
  menu:{ position:'absolute', left:sp(20), top:sp(20), zIndex:1, padding:6, borderColor:'transparent' }
});
