// TODO: check it express-promise-router
const router = require('express-promise-router')();
const controller = require('../controllers/discord.controller');

module.exports = function (client) {
    router.get('/getMaxUploadFileSize', controller.getMaxUploadFileSize);
    router.post('/content', controller.sendContent(client));

    return router;
};