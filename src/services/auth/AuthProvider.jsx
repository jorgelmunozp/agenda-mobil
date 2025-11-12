import { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';
import { types } from '../../types/types';

const initialState = { id: null, user: null, logged: false, restored: false };

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar estado al arrancar (equivalente a init + sessionStorage)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('user');
        if (raw) {
          const user = JSON.parse(raw);
          dispatch({ type: types.login, payload: user });
        }
      } catch {}
      dispatch({ type: types.restore }); // marca que ya restauró
    })();
  }, []);

  // Persistir cambios (equivalente al useEffect con localStorage)
  useEffect(() => {
    (async () => {
      try {
        if (state?.logged) {
          await AsyncStorage.setItem('user', JSON.stringify({ id: state.user.id, user: state.user.name, logged: state.logged, restored: state.restored }));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch {}
    })();
  }, [state?.logged, state?.user]);

  return <AuthContext.Provider value={{ id: state.id, user: state.user, logged: state.logged, restored: state.restored, dispatch }}>{children}</AuthContext.Provider>;
}
