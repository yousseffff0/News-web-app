const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  profile: {
    type: "String",
  },

  personTypeId: {
    type: "Number",
  },
  topic: ["string"],
  

  draft: {
    type: "String",
  },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", UserSchema);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT-KEY);
  return token;
};

module.exports = userModel;
