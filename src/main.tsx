import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { loadNames } from "./data/players.ts";

async function bootstrap() {
  await loadNames();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
