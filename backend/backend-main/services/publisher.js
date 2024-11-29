const userModel = require("../models/userModel.js");

module.exports.findAllpublishers = async () => {
  try {
    const publishers = await userModel.find();
    return publishers;
  } catch (err) {
    throw new Error("Could not retrieve publishers");
  }
};

module.exports.addNewPublisher = async (publisherInfo) => {
  try {
    const publisher = new userModel({
      username: publisherInfo.username,
      email: publisherInfo.email,
      password: publisherInfo.password,
      profilePic: publisherInfo.profilePic,
      draft: publisherInfo.draft,
      personTypeId: 2,
    });
    const createdPublisher = await publisher.save();

    return createdPublisher;
  } catch (err) {
    throw new Error("Could not create publisher");
  }
};

module.exports.deletePublisherById = async (publisherId) => {
  try {
    const deletedPublisher = await userModel.findByIdAndDelete(publisherId);

    if (!deletedPublisher) {
      throw new Error("Publisher not found");
    }

    return deletedPublisher;
  } catch (err) {
    throw new Error("Could not delete publisher");
  }
};
