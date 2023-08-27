const express = require("express");
const postsRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  updatePostById,
  deletePostById,
  addLike,
  removeLike,
} = require("../controllers/posts");
const {
  createNewComment,
  deleteCommentById,
} = require("../controllers/comments");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/Authentication");

// create new post
postsRouter.post("/", authentication, authorization("ADD_POST"), createNewPost);

// get All posts
postsRouter.get("/", authentication, getAllPosts);

// update post by id
postsRouter.put("/:id", updatePostById);

// delete post by id
postsRouter.delete("/:id", deletePostById);

// add new comment
postsRouter.post(
  "/:id/comments",
  authentication,
  authorization("ADD_COMMENT"),
  createNewComment
);
// delete comment by id
postsRouter.delete("/:postId/comments/:commentID", deleteCommentById);

// add like
postsRouter.post("/:postId/likes", authentication, addLike);

postsRouter.delete("/:postId/likes", authentication, removeLike);

module.exports = postsRouter;
