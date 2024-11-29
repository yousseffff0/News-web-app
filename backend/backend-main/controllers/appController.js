const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");
const sendMail = require("../controllers/sendMail.js");

require("dotenv").config();

const emailContent = {
  subject: "Custom Subject",
  body: {
    name: "Ze2red",
    intro: "Welcome to our website",
    table: {
      data: [
        {
          item: "Nodemailer bot",
          desciption: "Cloud",
        },
      ],
    },
  },
};

const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    let exist = await userModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};
// localhost:3001/api/register
const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;


    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Please use a unique username" });
    }


    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Please use a unique email" });
    }

    console.log("hyyyy");

    console.log("Password:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = new userModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
      personTypeId: 1,
    });

    const result = await user.save();

    await sendMail(email, emailContent);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// localhost:3001/api/login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      toast.error("Password does not match");
      return res.status(400).send({ error: "Password does not match" });
    }

    return res.status(200).send({
      msg: "Login Successful",
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

// localhost:3001/api/user/user1

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const userData = await userModel.findOne({ username });
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// localhost:3001/api/updateUser
const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      const body = req.body;

      const result = await userModel.updateOne({ _id: userId }, body);

      if (result.ok === 1) {
        return res.status(201).send({ msg: "Record Updated...!" });
      } else {
        return res.status(500).send({ error: "Failed to update record." });
      }
    } else {
      return res.status(400).send({ error: "User ID not provided...!" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateTopics = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      const { topic } = req.body;

      await userModel.updateOne({ _id: userId }, { topic });

      return res.status(201).send({ msg: "User Topics Updated...!" });
    } else {
      return res.status(400).send({ error: "User ID not provided...!" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  verifyUser,
  register,
  login,
  getUserByUsername,
  updateUser,
  updateTopics,
};
