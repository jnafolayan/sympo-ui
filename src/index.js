import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import "./index.css";
import "./assets/fonts/font-awesome/css/all.min.css";

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById("app")
);
