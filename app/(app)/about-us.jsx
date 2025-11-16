import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Title } from '../../src/components/title/Title';
import { Label } from '../../src/components/label/Label';
import { fs } from '../../src/dimensions';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';

export default function AboutUs() { 
    return (
      <ScrollView style={styles.box} contentContainerStyle={styles.view}>
        <View style={styles.container}>
          <Title>NOSOTROS</Title>
          <Text style={s.text}>Somos una app pensada para estudiantes</Text>
          <Text style={s.text}>Te ayudamos a organizar tus horarios y tareas diarias en un solo lugar</Text>
          <Text style={s.text}>Nuestro objetivo es facilitar tu día a día y ayudarte a aprovechar mejor tu tiempo</Text>
          <Label>Organiza tu vida, mejora tu estudio</Label>
        </View>
      </ScrollView>
    ); 
}

const s = StyleSheet.create({
  text: { fontSize: fs(14), color: colors.white, textAlign: 'center', marginBottom:12 },
});