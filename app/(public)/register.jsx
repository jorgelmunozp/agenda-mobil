import { useContext, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../src/services/auth/authContext';
import { types } from '../../src/types/types';
import { api } from '../../src/services/api/api';
import { router } from 'expo-router';
import { Title } from "../../src/components/title/Title";
import { Label } from "../../src/components/label/Label";
import { Input } from "../../src/components/input/Input";
import { Button } from '../../src/components/button/Button';
import { sp, fs } from '../../dimensions';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';

export default function Register(){
  const { dispatch } = useContext(AuthContext);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading]   = useState(false);
  const [err,setErr]           = useState('');

  const handleRegister = async () => {
    setErr('');
    try{
      setLoading(true);
      const r = await api.post('/auth/register', { username, password });
      const d = r?.data || {};
      if (d?.token) await AsyncStorage.setItem('token', String(d.token));
      if (d?.id)     await AsyncStorage.setItem('userId', String(d.id));
      dispatch({ type: types.login, payload: d?.user || { name: username } });
      router.replace('/(app)/home');
    }catch(e){
      setErr(String(e?.response?.data?.message || e?.response?.data?.error?.message || e?.message || 'No se pudo registrar'));
    }finally{
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
      <View style={styles.container}>
        <Title>REGISTRARSE</Title>
        <Label>Nombre</Label>
        <Input value={name} onChangeText={setName} isIcon={true} icon="person-outline" autoCapitalize="none" />

        <Label>Correo</Label>
        <Input value={email} onChangeText={setEmail} isIcon={true} icon="at" keyboardType="email-address" autoCapitalize="none" />

        <Label>Usuario</Label>
        <Input value={username} onChangeText={setUsername} isIcon={true} icon="person-circle-outline" autoCapitalize="none" />

        <Label>Contraseña</Label>
        <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" />


        <Button label='Crear cuenta' fallbackLabel='Registrando...' onPress={handleRegister} disabled={loading} />
        <Button label='Cancelar' fallbackLabel='Cancelando...' onPress={()=>router.push('/(public)/login')} />

        {!!err && <Text style={{color:colors.white, textAlign:'center', marginTop:sp(10), fontSize:fs(14)}}>{err}</Text>}
      </View>
    </ScrollView>
  );
}