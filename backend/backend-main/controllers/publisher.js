const publishersService = require('../services/publisher');

module.exports.getpublishers = async (req, res) => {
    try {
      const publishers = await publishersService.findAllpublishers();
      res.send({ publishers });
    } catch (err) {
      res.status(500);
      res.send({
        error: err,
      });
    }
  };
  
  module.exports.postPublisher = async (req, res) => {
    console.log(req.body);
    const publisherInfo = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
      draft: req.body.draft,
      personTypeId: 2,
    };
    try {
      const createdPublisher = await publishersService.addNewPublisher(
        publisherInfo
      );
      return res.status(201).send({
        msg: "publisher created successfully",
        publisherId: createdPublisher._id,
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message,
      });
    }
  };

module.exports.deletePublisherById = async (req, res) => {
    const publisherId = req.params.publisherId;

    try {
        const deletedPublisher = await publishersService.deletePublisherById(publisherId);

        return res.status(200).send({
            msg: `Publisher with ID ${publisherId} deleted successfully.`,
            deletedPublisher
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
};