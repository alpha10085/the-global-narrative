"use client";

import { persistor, store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


export default function Redux({ children }) {
  return (

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
  );
}
