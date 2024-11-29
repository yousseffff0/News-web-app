const DraftModel= require('../models/draft');
const {ObjectId} = require('mongoose').Types;

module.exports.addNewDraft= async(draftInfo)=>{
    try{
        const draft= new DraftModel({
            description: draftInfo.description,
            publishdate: draftInfo.publishdate,
            keyword: draftInfo.keyword,
            imgurl: draftInfo.imgurl,
            publisherId:new ObjectId(draftInfo.publisherId)
        });
        const draftArtical= await draft.save();
        return draftArtical;
    }catch(err){
        throw new Error('could not creat draft1.');
    }
};

module.exports.findAllDrafts = async (publisherId) => {
    try {
        // Use publisherId in the query to filter drafts for a specific publisher
        const query = publisherId ? { publisherId } : {};
        const drafts = await DraftModel.find(query);
        return drafts;
    } catch (err) {
        throw new Error('Could not retrieve drafts');
    }
};

exports.getDraftIdByDescription = async (description) => {
    try {
      const draft = await DraftModel.findOne({ description });
      if (draft) {
        return draft._id;
      } else {
        throw new Error('Draft not found with the given description');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  module.exports.getDraftById = async (draftId) => {
    try {
        const draft = await DraftModel.findById(draftId);
        if (draft) {
            return draft;
        } else {
            throw new Error('Draft not found with the given ID');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};