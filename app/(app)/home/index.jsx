import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList as TaskList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AddTask } from './AddTask';
import { TaskItem } from './TaskItem';
import { AppMenu } from '../../../src/components/menu/AppMenu';
import { SearchInput } from '../../../src/components/search/SearchInput';
import { Title } from '../../../src/components/title/Title';
import { api } from '../../../src/services/api/api';
import {sp } from '../../../src/dimensions';
import { colors } from '../../../src/theme/colors';
import { styles } from '../../../src/theme/styles';
import { Feather } from '@expo/vector-icons';
import { Pagination } from '../../../src/components/pagination/Pagination';

const usersEndpoint = process.env.EXPO_PUBLIC_ENDPOINT_USERS;

export default function Home() {
  const { userId } = useLocalSearchParams();
  const [openMenu, setOpenMenu] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  // ====== PAGINACIÓN ====== //
  const [pagination, setPagination] = useState({
    last_page: 1,
    limit: 5,
    page: 1,
    total: 0,
  });

  // Obtener tareas desde el backend (con paginación)
  const fetchTasks = useCallback(async () => {
    // setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      const response = await api.get(`${usersEndpoint}/${userId}/tasks?page=${pagination.page}&limit=${pagination.limit}`, { headers });

      const data = Array.isArray(response?.data?.data) ? response.data.data : [];
      setTasks(data);

      const meta = response?.data?.meta;
      if (meta && JSON.stringify(meta) !== JSON.stringify(pagination)) {
        setPagination(meta);
      }
    } catch (e) {
      console.log('tasks', e?.message);
      setTasks([]);
    } finally {
      setLoading(false); 
    }
  }, [userId, pagination]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Search
  const [q, setQ] = useState('');
  const norm = (s) =>
    (s ?? '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  const filteredTasks = tasks.filter((it) => norm(it?.task?.name ?? it?.name).includes(norm(q)));

  // Modal control
  const openAddTask = () => setModal(true);
  const closeAddTask = () => setModal(false);

  // Handlers de paginación
  const handleNextPage = () => {
    if (pagination.page < pagination.last_page) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  // Loading fallback
  if (loading) {
    return (
      <View style={[styles.box, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8, color: colors.text }}>Cargando…</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={[styles.container, s.rel]}>
          <View style={s.titleBox}>
            <Title>TAREAS</Title>
            <Pressable onPress={openAddTask} style={s.plusBtn}>
              <Feather name="plus" size={32} color={colors.white} />
            </Pressable>
          </View>

          <SearchInput value={q} onChangeText={setQ} />

          <TaskList data={filteredTasks} renderItem={({ item }) => <TaskItem item={item} />} keyExtractor={(it, i) => String(it?.id ?? it?._id ?? it?.taskId ?? i)} ListEmptyComponent={null} contentContainerStyle={{ paddingBottom: 12 }} scrollEnabled={false} />

          {/* Paginación extraída a componente aparte */}
          <Pagination page={pagination.page} lastPage={pagination.last_page} onPrev={handlePrevPage} onNext={handleNextPage} />

          <AddTask
            userId={userId}
            visible={modal}
            setModal={setModal}
            onClose={closeAddTask}
            onSaved={fetchTasks} // recarga la página actual al guardar tarea
          />
        </View>
      </ScrollView>

      {openMenu && <AppMenu onClose={() => setOpenMenu(false)} />}
    </>
  );
}

const s = StyleSheet.create({
  box: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  rel: { position: 'relative' },
  titleBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  plusBtn: {
    position: 'absolute',
    right: sp(0),
    top: sp(15),
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
