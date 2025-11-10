import { useContext, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../src/services/auth/authContext';
import { types } from '../../src/types/types';
import { api } from '../../src/services/api/api';
import { router } from 'expo-router';
import { Title } from '../../src/components/title/Title';
import { Label } from '../../src/components/label/Label';
import { Input } from '../../src/components/input/Input';
import { Button } from '../../src/components/button/Button';
import { sp, fs } from '../../dimensions';
import { colors } from '../../src/theme/colors';
import { styles } from '../../src/theme/styles';

export default function Login(){
  const { dispatch } = useContext(AuthContext);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState('');

  const handleLogin = async () => {
    setErr('');
    setLoading(true);
    try {
      const r = await api.post('/auth/login', { username, password });
      const d = r?.data ?? {};
      if (d?.token) await AsyncStorage.setItem('token', String(d.token));
      if (d?.id)    await AsyncStorage.setItem('userId', String(d.id));
      dispatch({ type: types.login, payload: d?.user ?? { name: username } });
      router.replace({ pathname: '/(app)/home', params: { userId: String(d.id) } });
    } catch (e) {
      setErr(String(e?.response?.data?.message || e?.response?.data?.error?.message || e?.message || 'No se pudo iniciar sesión'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
      <View style={styles.container}>
        <Title>INICIAR SESION</Title>
        <Label>Ingresa tu usuario</Label>
        <Input value={username} onChangeText={setUsername} isIcon={true} icon="person-circle-outline" keyboardType="email-address" autoCapitalize="none" />

        <Label>Ingresa tu contraseña</Label>
        <Input value={password} onChangeText={setPassword} secureTextEntry isIcon={true} icon="lock-closed-outline" autoCapitalize="none" />

        <Button label='Ingresar' fallbackLabel='Cargando...' onPress={handleLogin} disabled={loading} />
        <Button label='Registrarse' fallbackLabel='Registrando...' onPress={()=>router.push('/(public)/register')} />

        {/* ¿Olvidaste tu contraseña? — borde rojo fino + padding vertical (como Register) */}
        <Pressable
          onPress={()=>router.push('/(public)/recover')}
          style={{backgroundColor:'#d00000', borderRadius:sp(styles.radius+2), padding:sp(1), marginTop:sp(12)}}
        >
          <View style={{backgroundColor:colors.black, height:sp(styles.btnH), borderRadius:sp(styles.radius+2), alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:colors.white, fontSize:fs(16), fontWeight:'800'}}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </Pressable>

        {!!err && <Text style={{color:colors.white, textAlign:'center', marginTop:sp(10), fontSize:fs(14)}}>{err}</Text>}
      </View>
    </ScrollView>
  );
}