import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../../../src/services/api/api';
import { router } from 'expo-router';
import { Title } from '../../../../../src/components/title/Title';
import { Button } from '../../../../../src/components/button/Button';
import { colors } from '../../../../../src/theme/colors';
import { styles } from '../../../../../src/theme/styles';
import { sp } from '../../../../../src/dimensions';
import { Feather } from '@expo/vector-icons';

export default function Task(){
  const { userId, taskId } = useLocalSearchParams();
  const [task,setTask]=useState({});

  useEffect(() => { ( async () => { 
    try{ 
        const token = await AsyncStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        const response = await api.get(`/users/${userId}/tasks/${taskId}`, { headers });
        setTask(response?.data?.task || {}); 
    } catch(e) { console.log('task', e?.message);} })(); },[userId,taskId]);
  
  return(
    <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
      <View style={styles.container}>
        <View style={{display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'space-between', marginHorizontal:sp(30), marginBottom:sp(30)}}>
          <Feather name="star" size={36} color={colors.white} style={{marginRight:28}}/>
          <View style={{display:'flex', backgroundColor:'#28053f', borderRadius:sp(12), paddingHorizontal:sp(8), paddingBottom:sp(8)}}>
            <Text style={[s.h, { color:colors.white, paddingVertical:sp(1) }]}>{'Fecha de entrega:'}</Text>
            <View style={{display:'flex', flexDirection:"row", backgroundColor:'#28053f', borderRadius:sp(12)}}>
              <Text style={[s.h, { backgroundColor:colors.lightgray, borderRadius:sp(8) }]}>{task?.date || ''}</Text>
              <Text style={[s.h, { backgroundColor:colors.lightgray, borderRadius:sp(8), marginLeft:sp(12) }]}>{task?.time || ''}</Text>
            </View>
          </View>
        </View>

        <Title>{task?.name || ''}</Title>
        <Text style={[s.h, {color:colors.white, fontSize:sp(32), fontStyle:'italic' }]}>{task?.message || ''}</Text>

        <Button label='Regresar' fallbackLabel='Regresando...' onPress={() => router.replace({ pathname: '/(app)/home', params: { userId: userId } })} />
      </View>
    </ScrollView>
  );
}
const s=StyleSheet.create({ 
  box:{flex:1,padding:20,backgroundColor:colors.bg}, 
  p:{color:'#6b7280'}, 
  h:{fontSize:16,marginTop:8,padding:6,textAlign:'center'} 
});