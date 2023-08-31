import React, { useContext, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Posts from "../Home/Posts";
import Weather from "../Home/Weather";
import "./style.css";
import { AppContext } from "../../AppContext";
import FooterJS from "../FooterJS";
const { Header, Sider, Content, Footer } = Layout;

const Sidebar = () => {
  const { collapsed, setCollapsed } = useContext(AppContext);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      {" "}
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["0"]}
            items={[
              { key: "0", icon: <HomeOutlined />, label: "Home" },
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Profile",
              },
              {
                key: "2",
                icon: <UsergroupAddOutlined />,
                label: "Add Friends",
              },
              {
                key: "3",
                icon: <VideoCameraOutlined />,
                label: "Videos",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "UploadImage",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="side-bar-content">
              <Posts />
              <Weather />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            <FooterJS />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
