const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/users/sign-up", userController.signup);

module.exports = router;