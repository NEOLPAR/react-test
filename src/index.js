import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import App from "./App";

const rootElement = document.getElementById("root");

const appContent = (
  <Provider store={store}>
    <App />
  </Provider>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(appContent, rootElement);
} else {
  ReactDOM.render(appContent, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
