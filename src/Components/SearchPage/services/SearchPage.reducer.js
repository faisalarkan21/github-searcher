import { toast } from "react-toastify";
import { setError } from "../../../store/globalReducers/error.reducer";
import { setLoadingAsync } from "../../../store/globalReducers/loading.reducer";
import { Api } from "../../../utils/api";
import { setPersistedQuery } from "./SearchPage.persist";
import { RESET_PARAMS, SET_REPOSITORIES, SET_USERS } from "./types";

export function getSearchData(query, page = 1, typeSearch) {
  return async (dispatch, getState) => {
    let data = [];
    const { searchPagePersist } = getState();
    dispatch(setError(""));

    try {
      const tempRetrivedData = searchPagePersist.find(
        (v) =>
          v.query === query && v.typeSearch === typeSearch && v.page === page
      );

      if (searchPagePersist.length && tempRetrivedData) {
        if (typeSearch === "users") {
          dispatch(setUsers(tempRetrivedData));
        }

        if (typeSearch === "repositories") {
          dispatch(setRepositories(tempRetrivedData));
        }

        return;
      }

      dispatch(setLoadingAsync(true));

      const defaultPage = page + 1;
      if (typeSearch === "users") {
        data = await Api().Get(
          `/users?q=${query}&per_page=9&page=${defaultPage}`
        );
      }

      if (typeSearch === "repositories") {
        data = await Api().Get(
          `/repositories?q=${query}&per_page=9&page=${defaultPage}`
        );
      }

      let promisesDetailProfile = [];

      data.items.forEach((v) => {
        promisesDetailProfile.push(Api().Get(v.url));
      });

      const allDetailData = await Promise.all(promisesDetailProfile);

      const constructData = {
        total: data.total_count,
        data: allDetailData,
        query,
        typeSearch,
        page,
      };

      if (typeSearch === "users") {
        dispatch(setUsers(constructData));
      }

      if (typeSearch === "repositories") {
        dispatch(setRepositories(constructData));
      }

      dispatch(setLoadingAsync(false));
      if (!constructData.data.length) {
        return;
      }
      dispatch(setPersistedQuery(constructData));
    } catch (error) {
      const stringError = `Ups, terjadi kesalahan. \n\nDetails : ${error.response.data.message}`;
      dispatch(setError(stringError));
      toast(stringError);
      dispatch(setLoadingAsync(false));
      dispatch(resetParams());
    }
  };
}

function setUsers(users) {
  return {
    type: SET_USERS,
    payload: { ...users },
  };
}

function setRepositories(repositories) {
  return {
    type: SET_REPOSITORIES,
    payload: { ...repositories },
  };
}

export function resetParams() {
  return {
    type: RESET_PARAMS,
  };
}

let initialState = { total: 0, data: [], query: "" };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, ...action.payload };
    case SET_REPOSITORIES:
      return { ...state, ...action.payload };
    case RESET_PARAMS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
