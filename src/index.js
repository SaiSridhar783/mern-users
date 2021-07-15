import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
