const express = require("express");
const postsRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  updatePostById,
  deletePostById,
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

postsRouter.post(
  "/:id/comments",
  authentication,
  authorization("ADD_COMMENT"),
  createNewComment
);
postsRouter.delete("/:postId/comments/:commentID", deleteCommentById);
module.exports = postsRouter;
