const catchAsync = require('../../utils/catch-async');
const { User } = require('../../models');
const createSendToken = require('../utils/create-send-token');

const confirmUser = catchAsync(async (req, res, next) => {

    // 1. Get user based on token
    const user = await User.findOne({where: {id: req.user.id, userConfirmToken: req.params.confirmationToken}});

    // 2. If token has not expired set the new password
    if (!user || !user.userConfirmToken) {

        res.status(400).json({
            status: 'fail',
            message: 'Token is invalid'
        });

        return next(new BAError('Token is invalid', 400));

    }

    if (user.recruiter_id) {
        const referal = await User.findOne({where: {id: user.recruiter_id}});
        referal.recruits++;
        await referal.save();
    }

    user.userConfirmToken = null;
    user.role = 'beginner';
    await user.save();

    // 3. Log the user in, sent JWT
    createSendToken(user, 201, req, res);

});

module.exports = confirmUser;
