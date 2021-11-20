const SET_LOADING = "GLOBAL/SET_LOADING";

export default function reducer(state = false, action) {
  switch (action.type) {
    case SET_LOADING:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function setLoadingAsync(isLoading) {
  return { type: SET_LOADING, payload: isLoading };
}
