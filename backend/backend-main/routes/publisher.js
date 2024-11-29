const {Router}= require('express');
const publishersController= require('../controllers/publisher');
const publishersRouter = Router();

publishersRouter.get('/',publishersController.getpublishers);
publishersRouter.post('/',publishersController.postPublisher);
publishersRouter.delete('/:publisherId', publishersController.deletePublisherById);

module.exports= publishersRouter;