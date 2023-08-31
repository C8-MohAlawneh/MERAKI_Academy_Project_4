import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import React, { useContext } from "react";
import Home from "./components/Home";
import { AppContext } from "./AppContext";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import AddFriends from "./components/AddFriends";

function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="/addFriends" element={<AddFriends />} />
      </Routes>
    </div>
  );
}

export default App;
