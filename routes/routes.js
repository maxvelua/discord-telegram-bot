module.exports = function (app, client) {
    app.use('/discord', require('./discord.route')(client));
};