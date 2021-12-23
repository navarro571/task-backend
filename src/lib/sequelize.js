const { Sequelize } = require("sequelize");
const config = require("../config/config");
const setupModels = require("../db/models");

const sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
    logging: !config.isProd,
    dialectOptions: {
        rejectUnauthorized: !config.isProd,
    }
});

setupModels(sequelize);

module.exports = sequelize;