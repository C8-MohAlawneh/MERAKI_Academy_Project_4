import React from "react";
import "./style.css";
import Posts from "./Posts";
import Weather from "./Weather";
import Sidebar from "../Sidebar";

const Home = () => {
  return (
    <div className="home-page">
      <Sidebar />
    </div>
  );
};

export default Home;
