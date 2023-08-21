const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register Function
const register = (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;
  const newUser = new usersModel({
    firstName,
    lastName,
    email,
    age,
    password,
    role: "64e25a223ba168eed7960f8b",
  });
  if (password.length < 8) {
    res.status(422).json({
      success: false,
      message: `The password should be more than 8 character`,
    });
  } else {
    newUser
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Account Created Successfully`,
          user: result,
        });
      })
      .catch((err) => {
        if (err.keyPattern) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  }
};

// Login function
const login = (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role")
    .then(async (result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      } else {
        const isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
          res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        } else {
          const payload = {
            userId: result._id,
            user: `${result.firstName} ${result.lastName}`,
            role: result.role,
          };
          const options = {
            expiresIn: "60m",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
          });
        }
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

// get profile

const getProfile = (req, res) => {
  const userId = req.token.userId;
  usersModel
    .findOne({ _id: userId })
    .populate("posts friends role")
    .then((profile) => {
      res.status(200).json({
        success: true,
        message: "logged in profile",
        profile: profile,
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

// add photo for profile
const addUserPhoto = (req, res) => {
  const userId = req.token.userId;
  const userPhoto = req.body.userPhoto;
  usersModel
    .findOneAndUpdate({ _id: userId }, { userPhoto }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `no user login`,
        });
      }
      res.status(202).json({
        success: true,
        message: "The user photo updated",
        result: result.userPhoto,
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

module.exports = { register, login, getProfile, addUserPhoto };
