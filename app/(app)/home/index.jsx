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
import { sp } from '../../../src/dimensions';
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

  // ====== SEARCH ====== //
  const [q, setQ] = useState('');
  const norm = (s) =>
    (s ?? '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Obtener tareas desde el backend (con paginación + filtro)
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      const query = `?page=${pagination.page}&limit=${pagination.limit}${
        q ? `&q=${encodeURIComponent(q)}` : ''
      }`;

      const response = await api.get(`${usersEndpoint}/${userId}/tasks${query}`, { headers });

      const data = Array.isArray(response?.data?.data) ? response.data.data : [];
      setTasks(data);

      const meta = response?.data?.meta;
      if (meta) {
        setPagination((prev) => {
          const next = {
            ...prev,
            page: meta.page ?? prev.page,
            limit: meta.limit ?? prev.limit,
            total: meta.total ?? prev.total,
            last_page: meta.last_page ?? prev.last_page,
          };

          const same =
            prev.page === next.page &&
            prev.limit === next.limit &&
            prev.total === next.total &&
            prev.last_page === next.last_page;

          return same ? prev : next;
        });
      }
    } catch (e) {
      console.log('tasks', e?.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [userId, pagination.page, pagination.limit, q]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filtro adicional en front (por si el backend no filtra por q o quieres normalizar acentos)
  const filteredTasks = tasks.filter((it) =>
    norm(it?.task?.name ?? it?.name).includes(norm(q))
  );

  // Modal control
  const openAddTask = () => setModal(true);
  const closeAddTask = () => setModal(false);

  // Handlers de search: resetea a página 1 y actualiza q
  const handleSearchChange = (text) => {
    setQ(text);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

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
      <ScrollView
        style={styles.box}
        contentContainerStyle={styles.view}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, s.rel]}>
          <View style={s.titleBox}>
            <Title>TAREAS</Title>
            <Pressable onPress={openAddTask} style={s.plusBtn}>
              <Feather name="plus" size={32} color={colors.white} />
            </Pressable>
          </View>

          <SearchInput value={q} onChangeText={handleSearchChange} />

          <TaskList
            data={filteredTasks}
            renderItem={({ item }) => <TaskItem item={item} />}
            keyExtractor={(it, i) => String(it?.id ?? it?._id ?? it?.taskId ?? i)}
            ListEmptyComponent={null}
            contentContainerStyle={{ paddingBottom: 12 }}
            scrollEnabled={false}
          />

          <Pagination
            page={pagination.page}
            lastPage={pagination.last_page}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />

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
