const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id: id, exp: (Date.now() + process.env.JWT_EXPIRES_IN) / 1000}, process.env.JWT_SECRET);
};

module.exports = signToken;
