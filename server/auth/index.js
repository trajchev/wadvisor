const signup = require('./signup/signup');
const login = require('./login/login');
const logout = require('./logout/logout');
const protect = require('./protect/protect');
const restrictTo = require('./restrict/restrict');
const forgotPassword = require('./forgot-password/forgot-password');
const resetPassword = require('./reset-password/reset-password');
const updatePassword = require('./update-password/update-password');
const confirmUser = require('./confirm-user/confirm-user');
const refreshToken = require('./refresh-token/refresh-token');

module.exports = {

    signup,
    login,
    logout,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword,
    confirmUser,
    refreshToken

};
