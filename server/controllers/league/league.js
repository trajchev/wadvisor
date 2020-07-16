const { Group, Sport} = require('../../models');
const { read } = require('../../services');

const getLeagues = read.readAllSports(Group, Sport, 'sports');

module.exports = {
    getLeagues
};
