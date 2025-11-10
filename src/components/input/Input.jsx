import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';
import { sp, fs } from '../../../dimensions';

export const Input = (props) => (
  <View style={[s.inputWrap,{height:sp(styles.inputH), marginBottom:sp(styles.gapLg)}]}>
    { props.isIcon && <Ionicons name={props.icon} size={fs(styles.icon)} color={colors.black}
                        style={s.icon} />
    }
    <TextInput value={props.value} onChangeText={props.onChangeText}
      style={s.input} placeholderTextColor="#9ca3af" { ...props }
    />
  </View>
);

const s=StyleSheet.create({ 
  inputWrap:{ position:'relative', backgroundColor:colors.white, borderRadius:14, marginBottom:12, borderWidth:1, borderColor:'#d3d3d3' },
  input:{fontSize:fs(16), height:'100%',borderWidth:1,borderColor:colors.lightgray,borderRadius:8,textAlign:'center',backgroundColor:'#FFFFFF',color:'#000'},
  icon: {top:(sp(styles.inputH)-fs(styles.icon))/2, position:'absolute', left:14}
});