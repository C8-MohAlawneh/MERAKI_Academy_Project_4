import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import "./style.css";
import { BiSolidCheckCircle } from "react-icons/bi";

const Posts = () => {
  const { token } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [newUpdateOfPost, setNewUpdateOfPost] = useState({});
  const [updateId, setUpdateId] = useState("");
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
    <>
      <div className="create-new-post-container">
        <input />
        <button>Post</button>
      </div>
      <div className="posts-container">
        {posts &&
          posts.map((post) => {
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
                {/* start post content and update */}
                <div className="post-content">
                  {updateBtn && updateId === post._id ? (
                    <>
                      <input
                        defaultValue={post.post}
                        onChange={(e) => {
                          setNewUpdateOfPost({ post: e.target.value });
                        }}
                      />
                      {
                        <BiSolidCheckCircle
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/posts/${post._id}`,
                                newUpdateOfPost
                              )
                              .then((res) => {
                                // this function to rerender the updated posts
                                setPosts(
                                  posts.map((elem) => {
                                    if (elem._id === post._id) {
                                      elem.post = newUpdateOfPost.post;
                                    }
                                    return elem;
                                  })
                                );
                                setUpdateBtn(false);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        />
                      }
                    </>
                  ) : (
                    <h4>{post.post}</h4>
                  )}
                  {/* this element show the update and delete buttons for the login user*/}
                  {post.user._id === userId && (
                    <>
                      <button
                        onClick={() => {
                          setUpdateId(post._id);
                          setUpdateBtn((prv) => {
                            return !prv;
                          });
                        }}
                      >
                        update
                      </button>
                      <button
                        onClick={() => {
                          axios
                            .delete(`http://localhost:5000/posts/${post._id}`)
                            .then(() => {
                              setPosts(
                                posts.filter((elem) => {
                                  return elem._id !== post._id;
                                })
                              );
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        delete
                      </button>
                    </>
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
    </>
  );
};

export default Posts;
