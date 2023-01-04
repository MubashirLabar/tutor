import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./stores";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Loading } from "./components/molecules/Loading/Loading";
import { verifyToken } from "./api/users";
import { getLocalStorageToken } from "./services/token.service";
const store = configureStore();
const persistor = persistStore(store);
const token: string | null = getLocalStorageToken();
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { SENTRY_DSN, SENTRY_ENV } from "../src/config/config";
try {
  Sentry.init({
    attachStacktrace: true,
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
} catch (err) {
  // TODO: Add error tracing here
  // eslint-disable-next-line no-console
  console.log(`Failed to initialize Sentry: ${err}`);
}
token &&
  (async () => {
    await verifyToken();
  })();
ReactDOM.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {<App />}
      </PersistGate>
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
