import React from "react";
import Logo from "./Logo.png";
import "./style.css";
import Posts from "./Posts";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-nav-bar">
        <img src={Logo} width={100} height={50} />
        <input placeholder="Search" />
        <h4>profile</h4>
        <h4>Add friends</h4>
        <h4>log out</h4>
      </div>
      <Posts />
    </div>
  );
};

export default Home;
