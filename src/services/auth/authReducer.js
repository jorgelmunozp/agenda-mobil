import { types } from './types/types';

export const authReducer = (state, action = {}) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        user: action.payload,
        logged: true,
        restored: true,
      };

    case types.logout:
      return {
        ...state,
        user: null,
        logged: false,
        restored: true,
      };

    case types.restore:
      return {
        ...state,
        user: action.payload?.user ?? null,
        logged: !!action.payload?.logged,
        restored: true,
      };

    default:
      return state;
  }
};
