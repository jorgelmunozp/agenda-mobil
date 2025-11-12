import { StyleSheet } from 'react-native';
import { Text, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';
import { sp, fs } from '../../../src/dimensions';

export const Button = (props) => (
    <Pressable
        style={[s.button, {height:sp(styles.btnH), borderRadius:sp(styles.radius)}]}
        onPress={props.onPress}
        disabled={props.disabled} 
    >
        <Text style={{color:colors.white, fontSize:fs(20), fontWeight:'800'}}>
        {props.disabled ? props.fallbackLabel : props.label}
        </Text>
    </Pressable>
);

const s=StyleSheet.create({ 
  button:{ backgroundColor:colors.button, alignItems:'center', justifyContent:'center', marginTop:8 }
});

