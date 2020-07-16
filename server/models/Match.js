const Sequilize = require('sequelize');
const sequelize = require('../utils/database');

class Match extends Sequilize.Model {}

Match.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    home_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    away_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    commence_time: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    sport_key: {
        type: Sequilize.STRING,
        allowNull: false,
    },
}, {underscored: true, sequelize, modelName: 'match'});

module.exports = Match;
