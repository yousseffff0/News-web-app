const journalistModel = require('../models/journalist');

module.exports.findAllJournalists = async () => {
    try {
        const journalists = await journalistModel.find();
        return journalists;
    } catch (err) {
        throw new Error('Could not retrieve journalists');
    }
};

module.exports.addNewJournalist = async (journalistInfo) => {
    try {
        const journalist = new journalistModel({
            name: journalistInfo.name,
            email: journalistInfo.email,
            nationality: journalistInfo.nationality
            
        });
        const createdJournalist = await journalist.save();

        return createdJournalist;
    } catch (err) {
        throw new Error('Could not create journalist');
    }
};

module.exports.deleteJournalist = async (databaseId) => {
    try {
        const deletedJournalist = await journalistModel.findByIdAndDelete(databaseId);
        if (!deletedJournalist) {
            throw new Error('Journalist not found');
        }
        return deletedJournalist;
    } catch (err) {
        throw new Error(`Could not delete journalist: ${err.message}`);
    }
};