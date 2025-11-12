import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList as TaskList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AddTask } from "./AddTask";
import { TaskItem } from "./TaskItem";
import { AppMenu } from '../../../src/components/menu/AppMenu';
import { SearchInput } from "../../../src/components/search/SearchInput";
import { Title } from "../../../src/components/title/Title";
import { sp } from '../../../src/dimensions';
import { api } from '../../../src/services/api/api';
import { colors } from "../../../src/theme/colors";
import { styles } from '../../../src/theme/styles';
import { Feather } from '@expo/vector-icons';

export default function Home(){
  const { userId } = useLocalSearchParams();
  const [openMenu, setOpenMenu] = useState(false);

  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(false);
  const [modal,setModal] = useState(false);

  //Se obtienen las tareas desde el backend
  const fetchTasks = useCallback(async ()=>{
    setLoading(true);
    let alive = true;
    try{
      const token = await AsyncStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await api.get(`/users/${userId}/tasks`, { headers });
      const data = Array.isArray(response?.data?.data) ? response.data.data : [];
      if (alive) setTasks(data);
    } catch(e) { console.log('tasks', e?.message); }
    finally { if (alive) setLoading(false); }
    return () => { alive = false; };
  },[userId]);

  useEffect(()=>{ fetchTasks(); },[fetchTasks]);

  // Search
  const [q, setQ] = useState('');
  const norm = (s) => (s??'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const filteredTasks = tasks.filter(it => norm(it?.task?.name ?? it?.name).includes(norm(q)));

  // Modal control
  const openAddTask = () => setModal(true);
  const closeAddTask = () => setModal(false);

  if(loading){
    return (
      <View style={[styles.box,{flex:1,alignItems:'center',justifyContent:'center'}]}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop:8,color:colors.text}}>Cargando…</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={{ alignItems: 'center', paddingVertical: sp(styles.gapXL) }}>
        <View style={[styles.container, s.rel]}>
          <View>
            <Title>TAREAS</Title>
            {/* Botón (+) a la derecha del título */}
            <Pressable onPress={openAddTask} style={[s.plusBtn, { position: 'absolute', right: 0 }]}>
              <Feather name="plus" size={32} color={colors.white} />
            </Pressable>
          </View>

          <SearchInput value={q} onChangeText={setQ} />

          <TaskList data={filteredTasks} renderItem={({ item }) => <TaskItem item={item} />} keyExtractor={(it, i) => String(it?.id ?? it?._id ?? it?.taskId ?? i)} ListEmptyComponent={null} contentContainerStyle={{ paddingBottom: 12 }} scrollEnabled={false} />

          {/* Modal extraído */}
          <AddTask userId={userId} visible={modal} setModal={setModal} onClose={closeAddTask} />
        </View>
      </ScrollView>

      {openMenu && <AppMenu onClose={() => setOpenMenu(false)} />}
    </>
  );
}

const s=StyleSheet.create({
  box:{flex:1,backgroundColor:colors.bg,padding:20},
  rel:{position:'relative'},

  plusBtn:{width:36,height:36,borderRadius:18,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},
});
