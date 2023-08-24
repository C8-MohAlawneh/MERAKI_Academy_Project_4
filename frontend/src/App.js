import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import React, { createContext, useContext, useState } from "react";
import Home from "./components/Home";
// export const AppContext = createContext();
import { AppContext } from "./AppContext";
import Profile from "./components/Profile";

function App() {
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      {/* <AppContext.Provider value={{ setToken, token, setIsLoggedIn }}> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
