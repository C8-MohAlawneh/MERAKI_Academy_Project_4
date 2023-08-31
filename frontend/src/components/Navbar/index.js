import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { UsergroupAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Input, Layout } from "antd";
import axios from "axios";

const { Header } = Layout;
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
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <Header>
        <div className="home-nav-bar">
          <h2
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Social Media PlatForm
          </h2>
          <Search
            placeholder="Search Friends"
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
            style={{ cursor: "pointer" }}
            src={
              profile.userPhoto
                ? profile.userPhoto
                : "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg"
            }
            onClick={() => {
              navigate("/profile");
            }}
          />
          <UsergroupAddOutlined
            style={{ color: "blue", fontSize: "150%" }}
            onClick={() => {
              navigate("/addFriends");
            }}
          />
          <LogoutOutlined
            style={{ color: "red", fontSize: "150%" }}
            onClick={() => {
              localStorage.clear();
              setToken(null);
              setIsLoggedIn(false);
              navigate("/login");
              setProfile({});
            }}
          />
        </div>
        <div className="demo-logo" />
        {/* <Menu theme="dark" mode="horizontal" /> */}
      </Header>
    </Layout>
  );
};

export default Navbar;
