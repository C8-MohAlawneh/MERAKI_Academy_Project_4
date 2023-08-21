const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getProfile,
  addUserPhoto,
  sendFriendReq,
  acceptFriendReq,
  deleteFriendReq,
} = require("../controllers/users");
const authentication = require("../middleware/Authentication");
const authorization = require("../middleware/authorization");

usersRouter.post("/register", register);

usersRouter.post("/login", login);

// get profile
usersRouter.get("/profile", authentication, getProfile);

// add profile photo
usersRouter.put("/profile/userPhoto", authentication, addUserPhoto);

// send friend request
usersRouter.put(
  "/sendFriendReq/:friendId",
  authentication,
  authorization("ADD_FRIEND"),
  sendFriendReq
);

//accept a friend request
usersRouter.put("/accept/:friendId", authentication, acceptFriendReq);

// delete a friend request
usersRouter.put("/delete/:friendId", authentication, deleteFriendReq);

module.exports = usersRouter;
