const usersModel = require("../models/users");
const register = (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;
  const newUser = new usersModel({ firstName, lastName, email, age, password });
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

module.exports = { register };
