const postsModel = require("../models/posts");
const commentsModel = require("../models/comments");
const postsRouter = require("../routes/posts");

// create new post
const createNewPost = (req, res) => {
  const { post } = req.body;
  const user = req.token.userId;
  const newPost = new postsModel({
    post,
    user,
  });
  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        success: true,
        message: `Post created`,
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// get all posts
const getAllPosts = (req, res) => {
  const userId = req.token.userId;
  postsModel
    .find()
    .populate("comments likes")
    .exec()
    .then((posts) => {
      if (posts.length) {
        res.status(200).json({
          success: true,
          message: "All the Post",
          userId: userId,
          posts: posts,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Posts Yet`,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updatePostById = (req, res) => {
  const { id } = req.params;
  const { post } = req.body;
  postsModel
    .findOneAndUpdate({ _id: id }, { post }, { new: true })
    .then((post) => {
      if (post) {
        return res.status(202).json({
          success: true,
          message: "The post updated",
          post: post,
        });
      }
      res.status(404).json({
        success: false,
        message: `The post with id => ${id} not found`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


module.exports = { createNewPost, getAllPosts, updatePostById };
