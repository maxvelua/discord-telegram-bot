const discordService = require('../services/discord.service');

module.exports.getMaxUploadFileSize = function (client) {
    return function (req, res, next) {
        const guild = discordService.getGuild(client);
        const maxUploadFileSize = discordService.getMaxUploadFileSize(guild.premiumTier);

        return res.send({maxUploadFileSize});
    };
};

module.exports.sendContent = function (client) {
    return function (req, res, next) {
        const content = JSON.parse(req.body.content);

        client.channels.fetch(process.env.DISCORD_CHANNEL_ID).then((channel) => {
            if (channel) {
                channel.send(content.description, { files: content.files }).then((message) => {
                    return res.send(`✅`);
                }).catch((e) => {
                    return res.send('Виникла помилка при відправленні мема❌');
                });
            } else {
                return res.send('Виникли проблеми по стороні діскорд сервера, спробуйте пізніше (ні, щось зламалось)❌');
            }
        });
    }
};