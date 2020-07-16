const { User } = require('../../models');
const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');
const createSendToken = require('../utils/create-send-token');

const updatePassword = catchAsync(async (req, res, next) => {

    // 1. Get user from collection
    const user = await User.findOne({where: {id: req.user.id}});

    // 2. Check if posted pass is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        res.status(401).json({status: 'failure', message: 'Your current password is wrong'});
        return next(new BAError('Your current password is wrong', 401));
    }

    // 3. If pass is correct update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4. Log user In, send JWT
    createSendToken(user, 201, res);

});

module.exports = updatePassword;
