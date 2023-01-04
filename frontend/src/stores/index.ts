import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

/* create saga middleware */
import { rootSaga } from "../sagas";
export const sagaMiddleware = createSagaMiddleware();
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["users", "alert", "twilio", "agents"],
  debug: true,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
const configureStore = () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;
