import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import React, { createContext } from "react";
const AppContext = createContext();

function App() {
  return (
    <div className="App">
      <AppContext>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppContext>
    </div>
  );
}

export default App;
