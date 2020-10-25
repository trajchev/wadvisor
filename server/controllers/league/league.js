const { Group, Sport} = require('../../models');
const { read } = require('../../services');

const getLeagues = read.readAllSports(Group, Sport);

module.exports = {
    getLeagues
};
