// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./i18n";
import initIcons from "./services/IconService/IconService";

import Search from "./Search";
import App from "./App";
import "./index.scss";

initIcons();


export default function MainApp() {
  return (
    <Router>
      <Switch>
        <Route path="/graph"><App /></Route>
        <Route path="/"><Search /></Route>
      </Switch>
    </Router>
  );
}


ReactDOM.render(
  <Suspense fallback={<>Loading...</>}>
    <MainApp />
  </Suspense>,
  document.getElementById("root")
);
