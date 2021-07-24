import {
  LOADING,
  UPDATEUSER,
  FAILURE,
  LOGOUT,
  SUCCESS,
  DELETEEVENT,
  DELETEEVENTGROUP,
  ADDEVENT,
  ADDEVENTGROUP,
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
  allEvents: [],
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
      return { ...state, loading: false, error: payload }; // str
    case DELETEEVENT:
      const filtredEvents = state.allEvents.filter(ev => ev.uid !== payload);
      return {
        ...state,
        loading: false,
        error: false,
        allEvents: filtredEvents,
      };
    // case UPDATEEVENT:
    //   const apdatedEvents = state.allEvents.map(ev =>
    //     ev.uid === payload.uid ? payload : ev,
    //   );
    //   return {
    //     ...state,
    //     loading: false,
    //     error: false,
    //     allEvents: apdatedEvents,
    //   };

    case ADDEVENT:
      const uniqueObjects = [
        ...new Map(
          [...state.allEvents, ...payload].map(item => [item.uid, item]),
        ).values(),
      ];
      return {
        ...state,
        allEvents: uniqueObjects,
        loading: false,
        error: false,
      };

    case ADDEVENTGROUP:
      return {
        ...state,
        user: {
          ...state.user,
          myGroups: state.user.myGroups.map(gr =>
            gr.uid === payload.groupUid
              ? {
                  ...gr,
                  events: payload.events,
                }
              : gr,
          ),
        },
        loading: false,
        error: false,
      };

    case DELETEEVENT:
      return {
        ...state,
        allEvents: state.allEvents.filter(ev => ev.uid !== payload),
        loading: false,
        error: false,
      };

    case DELETEEVENTGROUP:
      return {
        ...state,
        user: {
          ...state.user,
          myGroups: state.user.myGroups.map(gr =>
            gr.uid === payload.groupUid
              ? {
                  ...gr,
                  events: gr.events.filter(ev => ev.uid !== payload.groupUid),
                }
              : gr,
          ),
        },
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}
