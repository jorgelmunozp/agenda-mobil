import { types } from '../../types/types';

export const authReducer = (state, action = {}) => {
  switch (action.type) {
    case types.login:
      return { ...state, logged: true, user: action.payload, restored: true };
    case types.logout:
      return { ...state, logged: false, user: null, restored: true };
    case types.restore:
      return { ...state, restored: true };
    default:
      return state;
  }
};
