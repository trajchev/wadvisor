const Sequilize = require('sequelize');
const sequelize = require('../utils/database');

class Team extends Sequilize.Model {}

Team.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
    },
    sport_name: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    sport_key: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequilize.STRING,
        defaultValue: 'team_logo.jpg'
    }
}, {underscored: true, sequelize, modelName: 'team'});

module.exports = Team;
