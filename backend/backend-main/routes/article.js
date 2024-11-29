const { Router } = require('express');
const articlecontroller = require('../controllers/article.js');
const articlerouter = Router();

articlerouter.get('/get/:publisherId', articlecontroller.getArticlesByPublisherId);
articlerouter.get('/', articlecontroller.findAllArticles);
articlerouter.get('/:keyword', articlecontroller.getArticlesByKeyword);
articlerouter.post('/', articlecontroller.addNewArticle);
articlerouter.get('/user/:username', articlecontroller.getArticlesByUserTopics);
articlerouter.route("/updateArticle").put(articlecontroller.updateArticle);
articlerouter.get('/journalist/:username', articlecontroller.getArticlesByUsername);

module.exports = articlerouter;