const { Router } = require('express');
const draftsController = require('../controllers/draft'); 

const draftsRouter = Router();

draftsRouter.post('/', draftsController.postDraft);
draftsRouter.get('/:draftId', draftsController.getDrafts);
draftsRouter.get('/draftid/:draftId', draftsController.getDraftById);
draftsRouter.route("/updateDraft").put(draftsController.updateDraft);
draftsRouter.get("/description/:description",draftsController.getDraftIdByDescription);

module.exports = draftsRouter;