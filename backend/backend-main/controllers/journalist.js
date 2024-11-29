const journalistsService = require('../services/journalist');

module.exports.getJournalists = async (req, res) => {
    try {
        const journalists = await journalistsService.findAllJournalists();
        res.send({ journalists });
    } catch (err) {
        res.status(500);
        res.send({
            error: err
        });
    }
};

module.exports.postJournalist = async (req, res) => {
    console.log(req.body);
    const journalistInfo = {
        name: req.body.name,
        email: req.body.email,
        nationality: req.body.nationality
        
    };
    try {
        const createdJournalist = await journalistsService.addNewJournalist(journalistInfo);
        return res.status(201).send({
            msg: "Journalist created successfully",
            journalistId: createdJournalist._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    };
};

module.exports.deleteJournalist = async (req, res) => {
    const databaseId = req.params.journalistId;

    try {
        const deletedJournalist = await journalistsService.deleteJournalist(databaseId);
        res.status(200).send({
            msg: "Journalist deleted successfully",
            deletedJournalist
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
};