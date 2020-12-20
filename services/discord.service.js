const { TIER_0_MAX_FILE_SIZE, TIER_2_MAX_FILE_SIZE, TIER_3_MAX_FILE_SIZE } = require('../constants/discord.constants');

exports.getGuild = function (client) {
    return client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
};

exports.getMaxUploadFileSize = function (premiumTier) {
    return premiumTier >= 2 ? (premiumTier === 2 ? TIER_2_MAX_FILE_SIZE : TIER_3_MAX_FILE_SIZE) : TIER_0_MAX_FILE_SIZE;
};