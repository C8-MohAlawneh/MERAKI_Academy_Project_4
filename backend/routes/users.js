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
  getAllProfiles,
  searchUsers,
} = require("../controllers/users");
const authentication = require("../middleware/Authentication");
const authorization = require("../middleware/authorization");

usersRouter.post("/register", register);

usersRouter.post("/login", login);

// get profile
usersRouter.get("/profile", authentication, getProfile);

// get all profiles
usersRouter.get("/allProfile", authentication, getAllProfiles);

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

// Search
usersRouter.post("/search/:word", searchUsers);

module.exports = usersRouter;
