const { Router } = require('express');
const journalistsController = require('../controllers/journalist');
const journalistsRouter = Router();

journalistsRouter.get('/', journalistsController.getJournalists);
journalistsRouter.post('/', journalistsController.postJournalist);
journalistsRouter.delete('/:journalistId', journalistsController.deleteJournalist);

module.exports = journalistsRouter;