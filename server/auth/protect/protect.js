const catchAsync = require('../../utils/catch-async');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const BAError = require('../../utils/BAError');
const { User } = require('../../models');

const protect = catchAsync( async (req, res, next) => {

    let token;

    // 1. Getting token and check if its there
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
        ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        res.status(401).json({ status: 'failure', message: 'You are not logged in. Please log in to get access' });
        return next(new BAError('You are not logged in. Please log in to get access', 401));
    }

    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findOne({where: {id: decoded.id}});
    if (!currentUser) {
        res.status(401).json({ status: 'failure', message: 'User doesn\'t exist' });
        return next(new BAError('The user no longer exists', 401));
    }

    // 4. Check if user change pass after token was issued
    if(currentUser.changedPassAfter(decoded.iat)) {
        // Inform user they're logged out
        res.status(401).json({ status: 'failure', message: 'User recently changed password'});
        return next(new BAError('User recently changed password. Please log in again', 401));
    }

    // Grant  access to protected route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();

});

module.exports = protect;
