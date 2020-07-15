const Sequilize = require('sequelize');
const sequelize = require('../utils/database');

class Sport extends Sequilize.Model {}

Sport.init({
    key: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    active: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
    },
    group_title: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    details: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
    }
}, {underscored: true, sequelize, modelName: 'sport'});

module.exports = Sport;
