import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

/* 
    Enable Below codes when switch to another computer to continue develop 
    Maybe I should consider using database ?? 
    But is it nesessary ???
*/

// import dataJson from "./data.json";
// localStorage.setItem("trello", JSON.stringify(dataJson.trello));
// localStorage.setItem("trelloLists", JSON.stringify(dataJson.trelloLists));
// localStorage.setItem("trelloTasks", JSON.stringify(dataJson.trelloTasks));

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
