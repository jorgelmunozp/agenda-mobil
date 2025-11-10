import { ScrollView, View, StyleSheet } from 'react-native';
import { Title } from '../../src/components/title/Title';
import { Label } from '../../src/components/label/Label';
import { sp } from '../../dimensions';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';

export default function AboutUs() { 
    return(
        <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
            <View style={styles.container}>
                <Title>NOSOTROS</Title>
                <Label style={s.p}>Somos una app pensada para estudiantes</Label>
                <Label style={s.p}>Te ayudamos a organizar tus horarios y tareas diarias en un solo lugar</Label>
                <Label style={s.p}>Nuestro objetivo es facilitar tu día a día y ayudarte a aprovechar mejor tu tiempo</Label>
                <Title>Organiza tu vida, mejora tu estudio</Title>
            </View>
        </ScrollView>
    ); 
}

const s = StyleSheet.create({ 
    box:{flex:1,padding:20,backgroundColor:colors.bg}, 
    p:{color:'#6b7280'} 
});