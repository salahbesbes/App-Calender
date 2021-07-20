import {
  LOADING,
  UPDATEUSER,
  FAILURE,
  LOGOUT,
  SUCCESS,
} from '../actions/auth-A';

export const initialState = {
  loading: false,
  error: false,
  user: {
    uid: null,
    email: null,
    name: null,
    phone: null,
    myGroups: [],
    myEvents: [],
    friends: [],
    age: null,
  },
};

export function authReducer(state, { type, payload }) {
  switch (type) {
    case LOADING:
      return { ...state, loading: true, error: false };
    case UPDATEUSER:
      return {
        ...state,
        loading: false,
        error: false,
        // ...state.user --> copy what whe have in the state
        //  { ...state.user, ...payload } --> merge 2 object so that we uppdate the state
        user: { ...state.user, ...payload },
      };
    case SUCCESS:
      return { ...state, loading: false, error: false };
    case LOGOUT:
      return initialState;
    case FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
