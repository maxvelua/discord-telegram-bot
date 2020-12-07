module.exports.getMaxUploadFileSize = async function (req, res, next, client) {

};

module.exports.sendMessage = function (client) {
    return function (req, res, next) {
        console.log(req.body.message);
        client.channels.fetch(process.env.DISCORD_CHANNEL_ID).then((channel) => {
            if (channel) {
                channel.send(req.body.message).then((message) => {
                    return res.send(`${req.body.message} 200`);
                }).catch((e) => {
                    return res.send('400');
                });
            } else {
                return res.send('404');
            }
        });
    }
};