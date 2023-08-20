const commentsModel = require("../models/comments");
const postsModel = require("../models/posts");

const createNewComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentsModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((comment) => {
      postsModel
        .findOneAndUpdate(
          { _id: id },
          { $push: { comments: comment._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `comment created`,
            comment: comment,
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

const deleteCommentById = (req, res) => {
  const { postId, commentID } = req.params;
  commentsModel
    .findOneAndDelete({ _id: commentID })
    .then(() => {
      postsModel
        .findOneAndUpdate(
          { _id: postId },
          { $pull: { comments: commentID } },
          { new: true }
        )
        .then((result) => {
          if (!result) {
            return res.status(404).json({
              success: false,
              message: `The post with id => ${postId} not found`,
            });
          }
          res.status(200).json({
            success: true,
            message: `comment deleted`,
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

module.exports = { createNewComment, deleteCommentById };
