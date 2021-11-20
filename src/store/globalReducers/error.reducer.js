const SET_ERROR = "GLOBAL/SET_ERROR";

export default function reducer(state = "", action) {
  switch (action.type) {
    case SET_ERROR:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function setError(err) {
  return { type: SET_ERROR, payload: err };
}
