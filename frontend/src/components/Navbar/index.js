import React, { useContext } from "react";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(AppContext);
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
      <h4
        onClick={() => {
          localStorage.clear();
          setToken(null);
          setIsLoggedIn(false);
          navigate("/login");
        }}
      >
        log out
      </h4>
    </div>
  );
};

export default Navbar;
