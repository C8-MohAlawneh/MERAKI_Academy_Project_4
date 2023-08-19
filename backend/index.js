const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./models/db");
const app = express();

const PORT = process.env.PORT || 5000;

// Routers
const usersRouter = require("./routes/users");
const roleRouter = require("./routes/roles");
const postsRouter = require("./routes/roles");

// const my=("abdsfdsfafdsfaaa").matchAll(/a/)
// console.log(my);
// console.log(my);

app.use(cors());
app.use(express.json());

// MW routers
app.use("/users", usersRouter);
app.use("/roles", usersRouter);
app.use("/posts", usersRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
