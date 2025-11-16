import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';
import { fs, sp } from '../../../src/dimensions';

export const Title = ({ children }) => (
    <View style={s.wrap}>
        <Text style={s.txt}>{children}</Text>
    </View>
);

const s=StyleSheet.create({ 
    wrap:{ marginBottom:16 }, 
    txt:{
        fontSize: fs(styles.title),
        fontWeight: '600', 
        color: colors.white, 
        fontFamily: 'Itim_400Regular',
        marginBottom:sp(styles.gap),
        textAlign: 'center'
    } 
});