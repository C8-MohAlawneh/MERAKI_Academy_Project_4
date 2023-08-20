const express = require("express");
const postsRouter = express.Router();
const { createNewPost } = require("../controllers/posts");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/Authentication");

// create new post
postsRouter.post("/", authentication, authorization("ADD_POST"), createNewPost);
module.exports = postsRouter;
