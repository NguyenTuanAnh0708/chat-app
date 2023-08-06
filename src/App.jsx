import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
