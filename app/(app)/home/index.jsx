import { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Platform, StyleSheet as RNStyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../../src/services/api/api';
import { router } from "expo-router";
import { AppMenu } from "../../../src/components/menu/AppMenu";
import { Title } from "../../../src/components/title/Title";
import { SearchInput } from "../../../src/components/search/SearchInput";
import { sp } from '../../../dimensions';
import { colors } from "../../../src/theme/colors";
import { styles } from '../../../src/theme/styles';
import { Feather } from '@expo/vector-icons';
import { AddTask } from "../../../src/components/modal/AddTask"; // <-- NUEVO

export default function Home(){
  const { userId } = useLocalSearchParams();
  const [openMenu, setOpenMenu] = useState(false);

  const [tasks,setTasks] = useState([]);
  const [items,setItems] = useState([]); // (se usa para “agregados” locales)
  const [loading,setLoading] = useState(false);
  const [modal,setModal] = useState(false);
  const [form,setForm] = useState({name:"",date:"",time:"",message:""});

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
  useEffect(()=>{ setItems([]); },[]);

  // Search
  const [q, setQ] = useState('');
  const norm = (s) => (s??'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const filteredTasks = tasks.filter(it => norm(it?.task?.name ?? it?.name).includes(norm(q)));

  // Modal control
  const open = () => setModal(true);
  const close = () => setModal(false);
  const change = (k,v) => setForm(prev => ({ ...prev, [k]:v }));
  const save = () =>{
    if(!form.name || !form.date || !form.time) return;
    const id = `t${tasks.length + 1}`;
    setItems(prev => [{id, ...form}, ...prev]);
    setForm({name:"", date:"", time:"", message:""});
    setModal(false);
  };

  const safe = (v)=> (v==null ? "" : typeof v === "string" ? v : String(v));

  const openTask = (taskId) => {
    router.replace({ pathname: '/(app)/users/[userId]/tasks/[taskId]', params: { userId: String(userId), taskId: String(taskId) } });
  };

  const TaskItem=({item}) => {
    const taskId = safe(item?.id ?? "id");
    const title = safe(item?.task?.name ?? "Tarea");
    const date  = safe(item?.task?.date ?? "fecha");
    const time  = safe(item?.task?.time ?? "hora");
    return (
      <Pressable onPress={() => openTask(taskId)} style={({ hovered, pressed }) => [s.card, hovered && s.cardHover, pressed && s.cardPressed]}>
        <Feather name="star" size={18} color={colors.white} style={{marginRight:28}}/>
        <View style={{flex:1}}>
          <Text style={s.cardTitle}>{title}</Text>
          {(date||time)? <Text style={s.cardMeta}>{[date,time].filter(Boolean).join(" · ")}</Text> : null}
        </View>
      </Pressable>
    );
  };

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
      <ScrollView style={styles.box} contentContainerStyle={{alignItems:'center', paddingVertical:sp(styles.gapXL)}}>
        <View style={[styles.container, s.rel]}>
          <View>
            <Title>TAREAS</Title>
            {/* Botón (+) a la derecha del título */}
            <Pressable onPress={open} style={[ s.plusBtn, { position:'absolute', right:0 } ]} >
              <Feather name="plus" size={32} color={colors.white}/>
            </Pressable>
          </View>

          <SearchInput value={q} onChangeText={setQ} />

          <FlatList
            data={filteredTasks}
            keyExtractor={(it,i) => String(it?.id ?? it?._id ?? it?.taskId ?? i)}
            renderItem={({item}) => <TaskItem item={item}/> }
            ListEmptyComponent={null}
            contentContainerStyle={{paddingBottom:12}}
            scrollEnabled={false}
          />

          {/* Modal extraído */}
          <AddTask visible={modal} onClose={close} form={form} onChange={change} onSave={save} />
        </View>
      </ScrollView>

      { openMenu && <AppMenu onClose={() => setOpenMenu(false)}/> }
    </>
  );
}

const s=StyleSheet.create({
  box:{flex:1,backgroundColor:colors.bg,padding:20},
  rel:{position:'relative'},

  plusBtn:{width:36,height:36,borderRadius:18,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},

  primaryBtn:{backgroundColor:colors.black,borderRadius:10,paddingVertical:16,width:'100%',alignItems:"center"},
  primaryText:{color:colors.white,fontWeight:"700"},

  card:{flexDirection:"row",alignItems:'center',backgroundColor:colors.primary,borderRadius:12,padding:12,marginBottom:10},
  cardHover: Platform.select({ web:{ boxShadow:'0 3px 5px rgba(0,0,0,.68)', borderRadius:12 } }),
  cardPressed: Platform.select({ ios:{ shadowColor:'#000', shadowOpacity:.25, shadowRadius:10, shadowOffset:{width:0,height:8} }, android:{ elevation:8 } }),
  cardTitle:{fontWeight:"700",fontSize:14,color:colors.text},
  cardMeta:{color:colors.white,marginTop:2,fontSize:12},
});
