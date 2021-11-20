import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(preloadedState = {}) {
  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["searchPagePersist"],
  };

  const pReducer = persistReducer(persistConfig, rootReducer());

  const middlewares = [thunkMiddleware.withExtraArgument()];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(pReducer, middlewareEnhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
