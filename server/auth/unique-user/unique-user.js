const { User } = require('../../models');
const { read } = require('../../services');

const isUsernameAvailable = read.isUsernameAvailable(User);

module.exports = isUsernameAvailable;
