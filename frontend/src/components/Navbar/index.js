import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { UsergroupAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import axios from "axios";
const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate();
  const {
    setToken,
    setIsLoggedIn,
    setAllProfiles,
    profile,
    setProfile,
    token,
  } = useContext(AppContext);
  const [searchByName, setSearchByName] = useState("");
  useEffect(() => {
    getMyProfile();
  }, []);
  const getMyProfile = () => {
    axios
      .get("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setProfile(result.data.profile);
      })
      .catch();
  };
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
          setSearchByName(e.target.value);
        }}
        onPressEnter={() => {
          axios
            .post(`http://localhost:5000/users/search/${searchByName}`)
            .then((result) => {
              setAllProfiles(result.data.result);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      <Avatar
        src={profile.userPhoto}
        onClick={() => {
          navigate("/profile");
        }}
      />
      <UsergroupAddOutlined
        style={{ color: "blue" }}
        onClick={() => {
          navigate("/addFriends");
        }}
      />
      <LogoutOutlined
        style={{ color: "red" }}
        onClick={() => {
          localStorage.clear();
          setToken(null);
          setIsLoggedIn(false);
          navigate("/login");
          setProfile({});
        }}
      />
    </div>
  );
};

export default Navbar;
