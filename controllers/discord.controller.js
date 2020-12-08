module.exports.getMaxUploadFileSize = async function (req, res, next, client) {

};

module.exports.sendContent = function (client) {
    return function (req, res, next) {
        const content = JSON.parse(req.body.content);

        client.channels.fetch(process.env.DISCORD_CHANNEL_ID).then((channel) => {
            if (channel) {
                channel.send(content.description, { files: content.files }).then((message) => {
                    return res.send(`Message was sended successfully`);
                }).catch((e) => {
                    return res.send('Some errors occurred while sending a message');
                });
            } else {
                return res.send('Problems with discord channel I can\'t send any message');
            }
        });
    }
};