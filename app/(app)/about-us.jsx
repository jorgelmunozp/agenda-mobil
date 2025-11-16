import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/assets/styles/colors';
import { fs } from '../../src/assets/styles/screen';
import { styles } from '../../src/assets/styles/styles';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';

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
  text: { fontSize: fs(14), color: colors.white, textAlign: 'center', marginBottom: 12 },
});
