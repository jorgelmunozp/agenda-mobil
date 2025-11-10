import { Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/styles';
import { fs, sp } from '../../../dimensions';

export const Label = ({ children }) => (
    <Text style={s.label}>{children}</Text>
);

const s = StyleSheet.create({ 
    label:{
        color: colors.hint, 
        fontSize: fs(styles.subtitle), 
        textAlign: 'center',
        marginBottom: sp(styles.gapLg), 
        fontFamily: 'Itim_400Regular'
    } 
});