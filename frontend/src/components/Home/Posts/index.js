import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import "./style.css";

const Posts = () => {
  const { token } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [updateBtn, setUpdateBtn] = useState(true);
  const [newUpdateOfPost, setNewUpdateOfPost] = useState({});
  useEffect(() => {
    const getAllPosts = () => {
      axios
        .get("http://localhost:5000/posts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setPosts(result.data.posts);
          setUserId(result.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllPosts();
    // console.log(posts);
  }, []);
  return (
    <div className="posts-container">
      {posts.map((post) => {
        return (
          <div key={post._id} className="one-post-container">
            {/* the info of user who post this post */}
            <div className="poster-info">
              <img
                className="post-image"
                src={post.user.userPhoto}
                width={50}
                height={50}
              />
              <h3>{`${post.user.firstName} ${post.user.lastName}`}</h3>
            </div>
            {/* post content and update */}
            <div className="post-content">
              {updateBtn ? (
                <h4>{post.post}</h4>
              ) : (
                <>
                  <input
                    defaultValue={post.post}
                    onChange={(e) => {
                      setNewUpdateOfPost({ post: e.target.value });
                    }}
                  />
                  <button></button>
                </>
              )}
              {post.user._id === userId && (
                <button
                  onClick={() => {
                    setUpdateBtn((prv) => {
                      return !prv;
                    });
                  }}
                >
                  update
                </button>
              )}
            </div>
            <div className="comment-content">
              {post.comments.map((comment) => {
                return (
                  <div key={comment._id} className="comment-container">
                    <p>{comment.comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
