import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterView from "./components/routes/RouteView";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "./assets/styles/global/index.scss";
import { Loading } from "./components/molecules/Loading/Loading";
import { ErrorBoundary } from "./components/helpers/ErrorBoundary";
import i18n from "./i18n";

const AppWrapper = () => {
  i18n.on("languageChanged", () => {
    console.log(i18n.language);
    i18n.language;
  });
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <RouterView />
        </Suspense>
      </ErrorBoundary>
      {/* <ErrorCapturer /> */}
    </Router>
  );
};

export default AppWrapper;
