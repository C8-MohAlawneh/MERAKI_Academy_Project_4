import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { Avatar, Button, List, Skeleton, Layout, Menu } from "antd";
import "./style.css";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import FooterJS from "../FooterJS";

const { Sider, Content, Footer } = Layout;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const AddFriends = () => {
  const { token, allProfiles, setAllProfiles, collapsed } =
    useContext(AppContext);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [friendsReq, setFriendsReq] = useState([]);

  useEffect(() => {
    friendProfiles();
    getMyProfile();
  }, []);
  const getMyProfile = () => {
    axios
      .get("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setFriendsReq(result.data.profile.friendsReq);
      })
      .catch();
  };
  const friendProfiles = () => {
    axios
      .get("http://localhost:5000/users//allProfile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((users) => {
        setAllProfiles(users.data.profile);

        setInitLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onLoadMore = () => {
    setLoading(true);
    setAllProfiles(
      allProfiles.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newUser = res.results.map((elem) => {
          return {
            firstName: elem.name.first,
            lastName: elem.name.last,
            userPhoto: elem.picture.medium,
          };
        });
        setAllProfiles([...allProfiles, ...newUser]);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
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
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div>
            <div className="friend-request-container">
              <List
                header={<h3 className="header-of-list">Friends Request</h3>}
                style={{ width: "60%" }}
                size="small"
                bordered
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={friendsReq}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        style={{ backgroundColor: "green" }}
                        onClick={async () => {
                          try {
                            await axios.put(
                              `http://localhost:5000/users/accept/${item._id}`,
                              "",
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );
                            setTimeout(() => {
                              setFriendsReq(
                                friendsReq.filter((elem) => {
                                  return elem._id !== item._id;
                                })
                              );
                            }, 500);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Accept
                      </Button>,
                      <Button
                        type="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={async () => {
                          try {
                            await axios.put(
                              `http://localhost:5000/users/delete/${item._id}`,
                              "",
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );
                            setTimeout(() => {
                              setFriendsReq(
                                friendsReq.filter((elem) => {
                                  return elem._id !== item._id;
                                })
                              );
                            }, 500);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
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
            </div>
            <div className="all-profile-container">
              <List
                header={
                  <h3 className="header-of-list">Discover New Friends</h3>
                }
                style={{ width: "60%" }}
                size="small"
                bordered
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={allProfiles}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a
                        key="list-loadmore-edit"
                        onClick={() => {
                          axios
                            .put(
                              `http://localhost:5000/users/sendFriendReq/${item._id}`,
                              "",
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((result) => {
                              setTimeout(() => {
                                setAllProfiles(
                                  allProfiles.filter((profile) => {
                                    return profile._id !== item._id;
                                  })
                                );
                              }, 500);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Send a friend request
                      </a>,
                    ]}
                  >
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
            </div>
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
  );
};

export default AddFriends;
