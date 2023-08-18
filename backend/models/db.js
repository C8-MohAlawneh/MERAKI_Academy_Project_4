const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB is ready to use");
  })
  .catch((err) => {
    console.log(err);
  });
