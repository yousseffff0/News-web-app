const DraftModel = require('../models/draft');
const DraftsService = require('../services/draft');
const ArticleModel = require('../models/article');

exports.postDraft = async (req,res)=>{
    console.log(req.body);
    const draftInfo={
        description: req.body.description,
        publishdate: req.body.publishdate,
        keyword: req.body.keyword,
        imgurl: req.body.imgurl,
        publisherId: req.body.publisherId,
    };
    try{
        const createdDraft = await DraftsService.addNewDraft(draftInfo);
        return res.status(201).send({
            msg: 'Draft created successfully',
            draftId: createdDraft._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    };
}

exports.getDrafts = async (req, res) => {
    try {
        const publisherId = req.query.publisherId;
        const drafts = await DraftsService.findAllDrafts(publisherId);
        res.send({ drafts });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
};

exports.updateDraft = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const body = req.body;

            const updatedDraft = await DraftModel.findOneAndUpdate({ _id: id }, body, { new: true });

            if (updatedDraft) {
                await DraftModel.deleteOne({ _id: id });
                const articleInfo = {
                    description: updatedDraft.description,
                    publishdate: updatedDraft.publishdate,
                    keyword: updatedDraft.keyword,
                    imgurl: updatedDraft.imgurl,
                    publisherId: updatedDraft.publisherId
                };

                const createdArticle = await ArticleModel.create(articleInfo);

                return res.status(201).send({
                    msg: "Record updated and moved to products",
                    articleId: createdArticle._id
                });
            } else {
                return res.status(404).send({ error: "Draft not found" });
            }
        } else {
            return res.status(401).send({ error: "User not Found...!" });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.getDraftIdByDescription = async (req, res) => {
    try {
      const description = req.params.description;
  
      if (!description) {
        return res.status(400).send({ error: 'Description parameter is required' });
      }
  
      const draftId = await DraftsService.getDraftIdByDescription(description);
  
      return res.status(200).send({
        msg: 'Draft ID retrieved successfully',
        draftId,
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
};


exports.getDraftById = async (req, res) => {
    try {
        const draftId = req.params.draftId;
        if (!draftId) {
            return res.status(400).send({ error: 'Draft ID parameter is required' });
        }

        const draft = await DraftsService.getDraftById(draftId);

        return res.status(200).send({
            msg: 'Draft retrieved successfully',
            draft,
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};