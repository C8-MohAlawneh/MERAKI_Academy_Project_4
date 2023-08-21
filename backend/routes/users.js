const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getProfile,
  addUserPhoto,
} = require("../controllers/users");
const authentication = require("../middleware/Authentication");

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.get("/profile", authentication, getProfile);

usersRouter.put("/profile/userPhoto", authentication, addUserPhoto);
module.exports = usersRouter;
