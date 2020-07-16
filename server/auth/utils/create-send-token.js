const signToken = require('./sign-token');

const createSendToken = (user, statusCode, req, res) => {

    if (!user) {
      return res.status(statusCode).json({
        status: 'fail',
        token: null,
        expiresIn: null,
        level: null
      })
    }

    const token = signToken(user.id);
    const expTime = Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1;

    const tokenOptions = {
        expires: new Date(expTime),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    };

    res.cookie('jwt', token, tokenOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        expiresIn: +process.env.JWT_COOKIE_EXPIRES_IN,
        level: user.role
    });

}

module.exports = createSendToken;
