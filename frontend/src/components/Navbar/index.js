import React, { useContext } from "react";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { UsergroupAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";

const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(AppContext);
  return (
    <div className="home-nav-bar">
      <img
        src={Logo}
        width={100}
        height={50}
        onClick={() => {
          navigate("/home");
        }}
      />
      <Search
        placeholder="Search"
        enterButton
        style={{ width: "25%" }}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <Avatar
        src=""
        onClick={() => {
          navigate("/profile");
        }}
      />
      <UsergroupAddOutlined
        onClick={() => {
          navigate("/addFriends");
        }}
      />
      <LogoutOutlined
        onClick={() => {
          localStorage.clear();
          setToken(null);
          setIsLoggedIn(false);
          navigate("/login");
        }}
      />
    </div>
  );
};

export default Navbar;
