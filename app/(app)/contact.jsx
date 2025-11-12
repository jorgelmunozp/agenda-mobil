import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Title } from '../../src/components/title/Title';
import { Label } from '../../src/components/label/Label';
import { sp } from '../../src/dimensions';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';

export default function Contact() { 
    return(
        <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
            <View style={styles.container}>
                <Title>CONTACTO</Title>
                <Label style={s.title}>Juan Fernando Muñoz</Label>
                <Text style={s.p}>juanferm0410@javerianacali.edu.co</Text>
                <Text style={[s.p, {marginBottom:sp(32)}]}>Cel: +57 3117863643</Text>

                <Label style={s.title}>Santiago Henao</Label>
                <Text style={s.p}>shr09@javerianacali.edu.co</Text>
                <Text style={[s.p, {marginBottom:sp(32)}]}>Cel: +57 3188511479</Text>

                <Label style={s.title}>Manuel Alejandro Quiceno</Label>
                <Text style={s.p}>alejandro121@javerianacali.edu.co</Text>
                <Text style={[s.p, {marginBottom:sp(32)}]}>Cel: +57 3233831135</Text>

                <Label style={s.title}>Nicolas Guerrero</Label>
                <Text style={s.p}>nicolasgm13@javerianacali.edu.co</Text>
                <Text style={s.p}>Cel: +57 3166236738</Text>                
            </View>
        </ScrollView>
    ); 
}

const s = StyleSheet.create({ 
    box:{flex:1,padding:20,backgroundColor:colors.bg}, 
    title:{color:colors.white, textAlign:'center'},
    p:{color:colors.white, textAlign:'center'} 
});