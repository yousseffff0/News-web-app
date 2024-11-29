const { Schema, model } = require("mongoose");

const journalistSchema = new Schema({
    name: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        required: true,
    },
    nationality: {
        type: "String",
        required: true,
    }
   
});

const journalistModel = model("journalists", journalistSchema);

module.exports = journalistModel;