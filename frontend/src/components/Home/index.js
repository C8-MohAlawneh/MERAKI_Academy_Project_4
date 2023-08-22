import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo.png";
import "./style.css";
import axios from "axios";
import { AppContext } from "../../AppContext";

const Home = () => {
  const { token } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
    // console.log(posts);
  }, []);
  const getAllPosts = () => {
    axios
      .get("http://localhost:5000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-page">
      <div className="home-nav-bar">
        <img src={Logo} width={100} height={50} />
        <input placeholder="Search" />
        <h4>profile</h4>
        <h4>Add friends</h4>
        <h4>log out</h4>
      </div>
      <div className="posts-container">
        {posts.map((post) => {
          return (
            <div key={post._id} className="one-post">
              <img
                className="post-image"
                src={post.user.userPhoto}
                width={50}
                height={50}
              />
              <h3>{`${post.user.firstName} ${post.user.lastName}`}</h3>
            </div>
            
          );
        })}
      </div>
    </div>
  );
};

export default Home;
