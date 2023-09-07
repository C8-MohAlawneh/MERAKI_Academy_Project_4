const postsModel = require("../models/posts");
const commentsModel = require("../models/comments");
const usersModel = require("../models/users");
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
      post.populate("user");
      usersModel
        .findOneAndUpdate({ _id: user }, { $push: { posts: post._id } })
        .then(() => {
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
    .populate("comments user")
    .populate({
      path: "comments",
      populate: {
        path: "commenter",
      },
    })

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
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// update post
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

// Delete post by id
const deletePostById = (req, res) => {
  const { id } = req.params;
  postsModel
    .findOneAndDelete({ _id: id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Post deleted`,
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

const addLike = async (req, res) => {
  const userId = req.token.userId;
  const { postId } = req.params;

  postsModel
    .findOneAndUpdate(
      { _id: postId },
      { $push: { likes: userId } },
      { new: true }
    )
    .populate("comments likes user")
    .then((post) => {
      res.status(202).json({
        success: true,
        message: `added like`,
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

const removeLike = (req, res) => {
  const { postId } = req.params;
  const userId = req.token.userId;

  postsModel
    .findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: userId } },
      { new: true }
    )
    .populate("comments likes user")
    .then((post) => {
      res.status(202).json({
        success: true,
        message: `deleted like`,
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

module.exports = {
  createNewPost,
  getAllPosts,
  updatePostById,
  deletePostById,
  addLike,
  removeLike,
};
