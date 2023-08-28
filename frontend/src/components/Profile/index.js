import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import "./style.css";
import { Card } from "antd";
import Posts from "../Home/Posts";
const Profile = () => {
  const { token, image, url, setImage, setUrl } = useContext(AppContext);
  const [profile, setProfile] = useState({});
  const [uploadImg, setUploadImg] = useState(false);
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
    <div className="profile-container">
      <div className="profile-face">
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
      </div>
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
        <div className="my-info">
          <Card title="My Info">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
