import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Label } from '../../src/components/label/Label';
import { Title } from '../../src/components/title/Title';
import { sp } from '../../src/dimensions';
import { colors } from '../../src/styles/colors';
import { styles } from '../../src/styles/styles';

export default function Contact() {
  return (
    <ScrollView style={styles.box} contentContainerStyle={styles.view}>
      <View style={styles.container}>
        <Title>CONTACTO</Title>
        <Label style={s.title}>Juan Fernando Muñoz</Label>
        <Text style={s.p}>juanferm0410@javerianacali.edu.co</Text>
        <Text style={[s.p, { marginBottom: sp(32) }]}>Cel: +57 3117863643</Text>

        <Label style={s.title}>Santiago Henao</Label>
        <Text style={s.p}>shr09@javerianacali.edu.co</Text>
        <Text style={[s.p, { marginBottom: sp(32) }]}>Cel: +57 3188511479</Text>

        <Label style={s.title}>Manuel Alejandro Quiceno</Label>
        <Text style={s.p}>alejandro121@javerianacali.edu.co</Text>
        <Text style={[s.p, { marginBottom: sp(32) }]}>Cel: +57 3233831135</Text>

        <Label style={s.title}>Nicolas Guerrero</Label>
        <Text style={s.p}>nicolasgm13@javerianacali.edu.co</Text>
        <Text style={s.p}>Cel: +57 3166236738</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  title: { color: colors.white, textAlign: 'center' },
  p: { fontSize: sp(11), color: colors.white, textAlign: 'center' },
});
