// TODO: check it express-promise-router
const router = require('express-promise-router')();
const controller = require('../controller/discord.controller');

module.exports = function (client) {
    router.get('/getMaxUploadFileSize', controller.getMaxUploadFileSize);
    router.post('/message', controller.sendMessage(client));

    return router;
};