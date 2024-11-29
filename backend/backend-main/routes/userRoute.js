const express = require("express");
const userRoute = express.Router();

const UserController = require("../controllers/appController.js");

//  Post methods
userRoute.route("/register").post(UserController.register);
userRoute.route("/login").post(UserController.login);
userRoute
  .route("/auth")
  .post(UserController.verifyUser, (req, res) => res.end());

// Get methods
userRoute.route("/user/:username").get(UserController.getUserByUsername);

// Put Methods
userRoute.route("/updateUser/:userId").put(UserController.updateUser);
userRoute.route("/updateTopics").put(UserController.updateTopics);

module.exports = userRoute;