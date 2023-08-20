const express = require("express");
const rolesRouter = express.Router();
const { createNewRole } = require("../controllers/roles");

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
