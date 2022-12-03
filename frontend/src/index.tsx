import "@/i18n/i18n";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/App";
import { Provider } from "react-redux";
import { persistor, store } from "@/app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/app.css";
import { BrowserRouter } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
