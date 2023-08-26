import React from "react";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="home-nav-bar">
      <img src={Logo} width={100} height={50} />
      <input placeholder="Search" />
      <h4
        onClick={() => {
          navigate("/profile");
        }}
      >
        profile
      </h4>
      <h4
        onClick={() => {
          navigate("/addFriends");
        }}
      >
        Add friends
      </h4>
      <h4>log out</h4>
    </div>
  );
};

export default Navbar;
