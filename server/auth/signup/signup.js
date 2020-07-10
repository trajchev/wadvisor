const catchAsync = require('../../utils/catch-async');
const { User } = require('../../models');
const Email = require('../../utils/Email');
const createSendToken = require('../utils/create-send-token');

const signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Check if we have a referral
    if (req.params.recruiter) {

        const user = await User.findOne({where: {username: req.params.recruiter}});

        if ( user ) {
            // If we have a referral, save the relationship
            newUser.recruiter_id = user.id;
            await newUser.save();
        }
    };


    // The link to the user profile
    const url = `${process.env.BASE_URL}me/${newUser.userConfirmToken}`;

    // Send the welcome email
    await new Email(newUser, url).sendWelcome();

    // Gen&Send token to user to authenticate
    createSendToken(newUser, 201, req, res);

});

module.exports = signup;
