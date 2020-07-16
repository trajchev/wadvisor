const Sequilize = require('sequelize');
const sequelize = require('../utils/database');

class FAQ extends Sequilize.Model {}

FAQ.init(
    {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        question: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequilize.TEXT,
            allowNull: false,
        }
    },
{underscored: true, sequelize, modelName: 'faq'});

module.exports = FAQ;
