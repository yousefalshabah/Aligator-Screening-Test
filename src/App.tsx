// src/App.tsx
import React from "react";
import Dashboard from "./components/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Dashboard />
    </>
  );
};

export default App;
