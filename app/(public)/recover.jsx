import { useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { api } from "../../src/services/api/api";
import { router } from "expo-router";
import { Title } from "../../src/components/title/Title";
import { Label } from "../../src/components/label/Label";
import { Input } from "../../src/components/input/Input";
import { Button } from '../../src/components/button/Button';
import { sp } from '../../dimensions';
import { styles } from '../../src/theme/styles';

export default function Recover(){
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  
  const submit = async () => {
    if(!email){ Alert.alert("Recuperar contraseña","Escribe tu correo"); return; }
    try{
      setLoading(true);
      await api.post("/auth/recover",{ email });
      Alert.alert("Listo","Te enviamos el enlace de recuperación a tu correo.");
      router.replace("/(public)/login");
    }catch(e){
      Alert.alert("Error","No se pudo enviar el correo de recuperación");
    }finally{ setLoading(false); }
  };

  return (
    <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
      <View style={styles.container}>
        <Title>RECUPERAR CONTRASEÑA</Title>

        <Label>Correo</Label>
        <Input value={email} onChangeText={setEmail} isIcon={true} icon="at" keyboardType="email-address" autoCapitalize="none" />
        
        <Button label='Enviar enlace' fallbackLabel='Enviando...' onPress={submit} disabled={loading} />
        <Button label='Cancelar' fallbackLabel='Cancelando...' onPress={()=>router.push('/(public)/login')} />
      </View>
    </ScrollView>
  );
}