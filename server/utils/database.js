const Sequelize = require('sequelize');

// connect to db with sequelize
const sequelize = new Sequelize(
    process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        logging: console.log,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        ssl: 'Amazon RDS',
        language: 'en'
        // disable logging
        // logging: false
    }
);

module.exports = sequelize;
