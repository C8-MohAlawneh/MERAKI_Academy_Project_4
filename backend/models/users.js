const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", usersSchema);
