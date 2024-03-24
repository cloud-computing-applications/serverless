const DB = require('./db');

module.exports = bootstrap = async () => {
    await DB.sequelize.authenticate();
    await DB.sequelize.sync({ alter: true });
}
