import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import "./style.css";
const Profile = () => {
  const { token } = useContext(AppContext);
  const [profile, setProfile] = useState({});
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
  // console.log(profile.posts[0].post);
  return (
    <div className="profile-container">
      <div className="profile-face">
        <img
          className="profile-image"
          src={
            profile.userPhoto
              ? profile.userPhoto
              : "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg"
          }
        />
        <h3>{profile.firstName + " " + profile.lastName}</h3>
      </div>
      <div className="body-of-profile">
        <div className="friends-container">
          <h3>My Friends</h3>
          {profile.friends &&
            profile.friends.map((friend) => {
              return <>{friend.firstName + " " + friend.lastName}</>;
            })}
        </div>
        <div className="profile-post">
        <h3>My Posts</h3>
          {profile.posts &&
            profile.posts.map((post) => {
              return <p>{post.post}</p>;
            })}
        </div>
        <div className="my-info"></div>
      </div>
    </div>
  );
};

export default Profile;
