const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: checkEmailValid,
      message: (str) => `${str.value} is not a valid email!`,
    },
  },
  age: { type: Number, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  friendsReq: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  password: { type: String, required: true },
  userPhoto: { type: String },
});

usersSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

// check the email Email format
function checkEmailValid() {
  if (
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      this.email
    )
  ) {
    return true;
  }
  return false;
}

module.exports = mongoose.model("User", usersSchema);
