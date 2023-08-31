import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import "./style.css";
import { BiSolidCheckCircle } from "react-icons/bi";
import { Avatar, Button, Card } from "antd";
import {
  DownOutlined,
  LikeOutlined,
  CommentOutlined,
  LikeTwoTone,
  LikeFilled,
} from "@ant-design/icons";
import { Dropdown, Space, Input } from "antd";
const { Meta } = Card;
const { TextArea } = Input;

const Posts = () => {
  const { token, profile } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useState({});
  const [userId, setUserId] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [newUpdateOfPost, setNewUpdateOfPost] = useState({});
  const [updateId, setUpdateId] = useState("");
  const [createComment, setCreateComment] = useState({});
  const [onePost, setOnePost] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // this items for dropdownlist
  const items = [
    {
      label: (
        <h3
          onClick={() => {
            setUpdateId(onePost._id);
            setUpdateBtn((prv) => {
              return !prv;
            });
          }}
        >
          update
        </h3>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <h3
          onClick={() => {
            axios
              .delete(`http://localhost:5000/posts/${onePost._id}`)
              .then(() => {
                setPosts(
                  posts.filter((elem) => {
                    return elem._id !== onePost._id;
                  })
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          delete
        </h3>
      ),
      key: "3",
      danger: true,
    },
  ];
  useEffect(() => {
    getAllPosts();
  }, []);
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
  return (
    <>
      <div className="posts-container">
        <div className="one-post-container">
          <Card
            bordered={true}
            style={{ width: "100%" }}
            actions={[
              <Button
                className="create-post-btn"
                style={{ width: "100%", border: "none", height: "100%" }}
                onClick={() => {
                  axios
                    .post("http://localhost:5000/posts", createPost, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((result) => {
                      setPosts([...posts, result.data.post]);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Post
              </Button>,
            ]}
          >
            <Meta
              avatar={<Avatar src={profile.userPhoto} />}
              title={`${profile.firstName} ${profile.lastName}`}
            />
            <TextArea
              className="create-post-input"
              onChange={(e) => {
                setCreatePost({ post: e.target.value });
              }}
              placeholder="write something"
            />
          </Card>
        </div>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id} className="one-post-container">
                {/* the info of user who post this post */}
                <Card
                  style={{ width: "100%" }}
                  actions={
                    post.user._id === userId
                      ? [
                          <>
                            <LikeFilled
                              className="like"
                              key="like"
                              style={
                                userId && post.likes.includes(userId)
                                  ? { color: "blue" }
                                  : { color: "grey" }
                              }
                              onClick={async () => {
                                try {
                                  isLiked
                                    ? await axios
                                        .delete(
                                          `http://localhost:5000/posts/${post._id}/likes`,
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        )
                                        .then((result) => {
                                          setPosts(
                                            posts.map((elem) => {
                                              return post._id === elem._id
                                                ? result.data.post
                                                : elem;
                                            })
                                          );
                                        })
                                    : await axios
                                        .post(
                                          `http://localhost:5000/posts/${post._id}/likes`,
                                          "",
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        )
                                        .then((result) => {
                                          setPosts(
                                            posts.map((elem) => {
                                              return post._id === elem._id
                                                ? result.data.post
                                                : elem;
                                            })
                                          );
                                        });
                                  setIsLiked((prv) => {
                                    return !prv;
                                  });
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            />
                            likes:{post.likes.length}
                          </>,
                          <>
                            <CommentOutlined
                              key="comment"
                              onClick={() => {
                                setUpdateId(post._id);
                                setShowComments((prv) => {
                                  return !prv;
                                });
                              }}
                            />
                            comments:{post.comments.length}
                          </>,
                          <>
                            <Dropdown menu={{ items }} trigger={["click"]}>
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOnePost(post);
                                }}
                              >
                                <Space>
                                  <DownOutlined />
                                </Space>
                              </a>
                            </Dropdown>
                            edit
                          </>,
                        ]
                      : [
                          <>
                            <LikeFilled
                              key="like"
                              style={
                                isLiked ? { color: "blue" } : { color: "grey" }
                              }
                              onClick={async () => {
                                try {
                                  isLiked
                                    ? await axios
                                        .delete(
                                          `http://localhost:5000/posts/${post._id}/likes`,
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        )
                                        .then((result) => {
                                          setPosts(
                                            posts.map((elem) => {
                                              return post._id === elem._id
                                                ? result.data.post
                                                : elem;
                                            })
                                          );
                                        })
                                    : await axios
                                        .post(
                                          `http://localhost:5000/posts/${post._id}/likes`,
                                          "",
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        )
                                        .then((result) => {
                                          setPosts(
                                            posts.map((elem) => {
                                              return post._id === elem._id
                                                ? result.data.post
                                                : elem;
                                            })
                                          );
                                        });
                                  setIsLiked((prv) => {
                                    return !prv;
                                  });
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            />
                            likes:{post.likes.length}
                          </>,
                          <>
                            <CommentOutlined
                              key="comment"
                              onClick={() => {
                                setUpdateId(post._id);
                                setShowComments((prv) => {
                                  return !prv;
                                });
                              }}
                            />
                            comments:{post.comments.length}
                          </>,
                        ]
                  }
                >
                  <Meta
                    avatar={<Avatar src={post.user.userPhoto} />}
                    title={`${post.user.firstName} ${post.user.lastName}`}
                    description={`${new Date(post.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )} at ${new Date(post.createdAt).toLocaleTimeString(
                      "en-US"
                    )}`}
                  />
                  {/* start post content and update */}
                  <div className="post-content">
                    {updateBtn && updateId === post._id ? (
                      <>
                        <TextArea
                          defaultValue={post.post}
                          onChange={(e) => {
                            setNewUpdateOfPost({ post: e.target.value });
                          }}
                        />
                        {
                          <BiSolidCheckCircle
                            style={{
                              color: "green",
                              fontSize: "200%",
                              cursor: "pointer",
                            }}
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
                      <div className="post-and-input">
                        <h3>{post.post}</h3>
                      </div>
                    )}
                  </div>
                </Card>
                {/* all comments of post  */}
                {showComments && post._id === updateId && (
                  <div className="comment-content">
                    {post.comments.map((comment) => {
                      return (
                        <div key={comment._id} className="comment-container">
                          <p className="comment-text">
                            <span>
                              <Avatar src={comment.commenter.userPhoto} />
                            </span>
                            {comment.comment}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* create new Comment */}
                {showComments && post._id === updateId && (
                  <div className="comment-form">
                    <input
                      className="comment-input"
                      type="string"
                      placeholder="write a comment"
                      onChange={(e) => {
                        setCreateComment({ comment: e.target.value });
                      }}
                    />
                    <button
                      className="comment-button"
                      onClick={() => {
                        axios
                          .post(
                            `http://localhost:5000/posts/${post._id}/comments`,
                            createComment,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((result) => {
                            getAllPosts();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      add
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Posts;
