const { Op } = require("sequelize");
const catchAsync = require('../../utils/catch-async');
const { User } = require('../../models');
const Email = require('../../utils/Email');
const createSendToken = require('../utils/create-send-token');

const signup = catchAsync(async (req, res, next) => {

  const [user, created] = await User.findOrCreate({
    where: { [Op.or]: [{username: req.body.username}, {email: req.body.email}]},
    defaults: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    }
  });

  if (created) {
    if (req.params.recruiter) {

        const recruiter = await User.findOne({where: {username: req.params.recruiter}});

        if ( recruiter ) {
            // If we have a referral, save the relationship
            user.recruiter_id = recruiter.id;
            await user.save();
        }
    };

    // The link to the user profile
    const url = `${process.env.BASE_URL}me/${user.userConfirmToken}`;

    // Send the welcome email
    await new Email(user, url).sendWelcome();

    // Gen&Send token to user to authenticate
    createSendToken(user, 200, req, res);

  } else {
    createSendToken(null, 200, req, res);
    throw new Error();
  }
});

module.exports = signup;
