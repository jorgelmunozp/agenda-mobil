import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, FlatList as TaskList, View } from 'react-native';
import { colors } from '../../../src/assets/styles/colors';
import { sp } from '../../../src/assets/styles/screen';
import { styles } from '../../../src/assets/styles/styles';
import { Loading } from '../../../src/components/loading/Loading';
import { AppMenu } from '../../../src/components/menu/AppMenu';
import { Pagination } from '../../../src/components/pagination/Pagination';
import { Title } from '../../../src/components/title/Title';
import { api } from '../../../src/services/api/api';
import { AddTask } from './AddTask';
import { TaskItem } from './TaskItem';

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

  // Obtener tareas desde el backend (con paginación + filtro)
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get(`${usersEndpoint}/${userId}/tasks?page=${pagination.page}&limit=${pagination.limit}`);
      const data = response?.data?.data || [];
      setTasks(data);

      const meta = response?.data?.meta;
      if (JSON.stringify(meta) !== JSON.stringify(pagination)) {
        setPagination(meta);
      }
    } catch (e) {
      console.log('Error: ', e?.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [userId, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
    return <Loading label={'Cargando tareas... '} />;
  }

  return (
    <>
      <ScrollView style={styles.box} contentContainerStyle={styles.view} keyboardShouldPersistTaps="handled">
        <View style={[styles.container, s.rel]}>
          <View style={s.titleBox}>
            <Title>TAREAS</Title>
            <Pressable onPress={openAddTask} style={s.plusBtn}>
              <Feather name="plus" size={30} color={colors.white} />
            </Pressable>
          </View>

          <TaskList data={tasks} renderItem={({ item }) => <TaskItem item={item} />} keyExtractor={(it, i) => String(it?.id ?? it?._id ?? it?.taskId ?? i)} ListEmptyComponent={null} contentContainerStyle={{ paddingBottom: 12 }} scrollEnabled={false} />

          <Pagination page={pagination.page} lastPage={pagination.last_page} onPrev={handlePrevPage} onNext={handleNextPage} />

          <AddTask userId={userId} visible={modal} setModal={setModal} onClose={closeAddTask} onSaved={fetchTasks} />
        </View>
      </ScrollView>

      {openMenu && <AppMenu onClose={() => setOpenMenu(false)} />}
    </>
  );
}

const s = StyleSheet.create({
  rel: { position: 'relative' },
  titleBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  plusBtn: {
    position: 'absolute',
    right: sp(0),
    top: sp(2),
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
