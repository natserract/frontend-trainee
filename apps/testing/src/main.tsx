import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMocks } from "./test/server/index.ts";

initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
