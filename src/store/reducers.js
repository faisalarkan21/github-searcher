import { combineReducers } from "redux";
import { default as SearchPageReducer } from "../Components/SearchPage/services/SearchPage.reducer";
import { default as SearchPagePersist } from "../Components/SearchPage/services/SearchPage.persist";
import { default as GlobalLoadingReducer } from "./globalReducers/loading.reducer";
import { default as GlobalErrorReducer } from "./globalReducers/error.reducer";

const makeRootReducer = () => {
  return combineReducers({
    searchPagePersist: SearchPagePersist,
    searchResult: SearchPageReducer,
    isPageloading: GlobalLoadingReducer,
    error: GlobalErrorReducer,
  });
};

export default makeRootReducer;
