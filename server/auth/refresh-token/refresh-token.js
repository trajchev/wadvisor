const catchAsync = require('../../utils/catch-async');
const { User } = require('../../models');
const createSendToken = require('../utils/create-send-token');

const refreshToken = catchAsync(async (req, res, next) => {

    // 1. Get user based on token
    const user = await User.findByPk(req.user.id);

    // 2. If token has not expired set the new password
    if (!user) {

        res.status(400).json({
            status: 'fail',
            message: 'Token is invalid'
        });

        return next(new BAError('Token is invalid', 400));

    }

    // 3. Log the user in, sent JWT
    createSendToken(user, 201, req, res);

});

module.exports = refreshToken;
