const express = require("express");
const postsRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  updatePostById,
} = require("../controllers/posts");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/Authentication");

// create new post
postsRouter.post("/", authentication, authorization("ADD_POST"), createNewPost);

// get All posts
postsRouter.get("/", authentication, getAllPosts);

// update post
postsRouter.put("/:id", updatePostById);

module.exports = postsRouter;
