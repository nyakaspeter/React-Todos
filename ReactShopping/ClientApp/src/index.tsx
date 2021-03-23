
import "./styles/theme.scss"; 
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes } from "./components";
import store from "./redux/store";

require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById("app")
);
