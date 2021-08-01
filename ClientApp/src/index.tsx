import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/theme.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes } from "./components";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

require("jquery/dist/jquery.min.js");
require("bootstrap/dist/js/bootstrap.min.js");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
