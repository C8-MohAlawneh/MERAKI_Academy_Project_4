import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import React, { createContext, useState } from "react";
import Home from "./components/Home";
export const AppContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  return (
    <div className="App">
      <AppContext.Provider value={{ setToken, token, setIsLoggedIn }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isLoggedIn && <Route path="/home" element={<Home />} />}
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
