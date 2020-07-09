const Sequelize = require('sequelize');

// connect to db with sequelize
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
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
