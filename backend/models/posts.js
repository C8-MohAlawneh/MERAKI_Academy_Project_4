const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    post: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postsSchema);
