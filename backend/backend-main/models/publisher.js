const { Schema, model } = require("mongoose");

const publisherSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  profilePic: {
    type: "String",
  },
  draft:{ 
    type:"String"
  }
  
});

const publisherModel = model("publisher", publisherSchema);

module.exports = publisherModel;