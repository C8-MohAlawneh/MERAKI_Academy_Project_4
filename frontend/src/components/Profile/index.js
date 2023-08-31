import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import "./style.css";
import { Avatar, List, Skeleton, Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;

const Profile = () => {
  const {
    token,
    image,
    url,
    setImage,
    setUrl,
    profile,
    setProfile,
    collapsed,
  } = useContext(AppContext);
  const [uploadImg, setUploadImg] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
  // upload Image
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "userImage");
    data.append("cloud_name", "dytlmprs3");
    fetch("https://api.cloudinary.com/v1_1/dytlmprs3/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        axios
          .put(
            "http://localhost:5000/users/profile/userPhoto",
            {
              userPhoto: data.url,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((result) => {
            setProfile(result.data.result);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className="profile-container">
            <div className="profile-face">
              <div className="img-and-name">
                <img
                  onClick={() => {
                    setUploadImg((prv) => !prv);
                  }}
                  className="profile-image"
                  src={
                    profile.userPhoto
                      ? profile.userPhoto
                      : "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg"
                  }
                />
                <h3>{profile.firstName + " " + profile.lastName}</h3>
                {uploadImg && (
                  <div className="upload-image">
                    <div>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      ></input>
                      <button onClick={uploadImage}>update</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="body-of-profile">
              <div className="my-info">
                {
                  <List
                    style={{ width: "25vw" }}
                    size="large"
                    header={<h3>My Info</h3>}
                    bordered
                    dataSource={[
                      `First Name: ${profile.firstName}`,
                      `Last Name: ${profile.lastName}`,
                      `Age: ${profile.age}`,
                      `Email: ${profile.email}`,
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <h3>{item}</h3>
                      </List.Item>
                    )}
                  />
                }
              </div>
              <div className="profile-post">
                {
                  <List
                    style={{ width: "40vw" }}
                    size="large"
                    header={<h3 className="header-of-list">My Posts</h3>}
                    bordered
                    itemLayout="horizontal"
                    dataSource={profile.posts}
                    renderItem={(item) => (
                      <List.Item actions={[]}>
                        <h3>{item.post}</h3>
                      </List.Item>
                    )}
                  />
                }
              </div>
              <div className="friends-container">
                {
                  <List
                    style={{ width: "25vw" }}
                    header={<h3 className="header-of-list">My Friends</h3>}
                    size="large"
                    bordered
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={profile.friends}
                    renderItem={(item) => (
                      <List.Item actions={[]}>
                        <Skeleton
                          avatar
                          title={false}
                          loading={item.loading}
                          active
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={item.userPhoto} />}
                            title={
                              <a href="https://ant.design">
                                {item.firstName + " " + item.lastName}
                              </a>
                            }
                            description={item.email}
                          />
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                }
              </div>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Profile;
