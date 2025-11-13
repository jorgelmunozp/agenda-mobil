import { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';
import { types } from '../../types/types';

const initialState = {
  user: null,
  logged: false,
  restored: false,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar estado al arrancar
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('user');

        if (raw) {
          const saved = JSON.parse(raw);
          dispatch({
            type: types.restore,
            payload: { user: saved, logged: true },
          });
        } else {
          dispatch({
            type: types.restore,
            payload: { user: null, logged: false },
          });
        }
      } catch {
        dispatch({
          type: types.restore,
          payload: { user: null, logged: false },
        });
      }
    })();
  }, []);

  // Persistir cambios
  useEffect(() => {
    (async () => {
      try {
        if (state.logged && state.user) {
          await AsyncStorage.setItem('user', JSON.stringify(state.user));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch {}
    })();
  }, [state.logged, state.user]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
