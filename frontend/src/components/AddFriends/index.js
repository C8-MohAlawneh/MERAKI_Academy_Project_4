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
  
  useEffect(() => {
    friendProfiles();
  }, []);
  const friendProfiles = () => {
    axios
      .get("http://localhost:5000/users//allProfile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((users) => {
        // console.log(users.data.profile);
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
        {/* <Button onClick={onLoadMore}>loading more</Button> */}
      </div>
    ) : null;
  return (
    <div>
      <div className="friend-request-container"></div>
      <div className="all-profile-container">
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={allProfiles}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit">Send a friend request</a>]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.userPhoto} />}
                  title={<a href="https://ant.design">{item.firstName}</a>}
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
