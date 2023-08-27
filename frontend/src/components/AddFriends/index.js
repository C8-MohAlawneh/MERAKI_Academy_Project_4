import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { Avatar, Button, List, Skeleton } from "antd";
import "./style.css";

const AddFriends = () => {
  const { token } = useContext(AppContext);
  const [allProfiles, setAllProfiles] = useState([]);
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
        console.log(result.data.profile);
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
        <Button>loading more</Button>
      </div>
    ) : null;
  return (
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
                      setFriendsReq(
                        friendsReq.filter((elem) => {
                          return elem._id !== item._id;
                        })
                      );
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
                      setFriendsReq(
                        friendsReq.filter((elem) => {
                          return elem._id !== item._id;
                        })
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Delete
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
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
          header={<h3 className="header-of-list">Discover New Friends</h3>}
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
              <Skeleton avatar title={false} loading={item.loading} active>
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
  );
};

export default AddFriends;
