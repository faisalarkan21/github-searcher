import { RESET_PERSIST_DATA, SET_PERSIST_DATA } from "./types";

export function setPersistedQuery(persistedQuery) {
  return {
    type: SET_PERSIST_DATA,
    payload: { ...persistedQuery },
  };
}

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PERSIST_DATA:
      const mergeAllPersisted = state.concat(action.payload);
      return mergeAllPersisted;
    case RESET_PERSIST_DATA:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
