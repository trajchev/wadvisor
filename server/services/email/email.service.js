const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');

const sendMail = Model => catchAsync(async (req, res, next) => {

  const users = req.body.users;
  const subject = req.body.subject;

  if (users && subject) {
      users.forEach((user, idx) => {
          setTimeout( async () => {
              await new Email(user, 'https://affiliate.link.com').sendAffiliate(subject);
          }, idx * 5000)
      });

      res.status(200).json({
          status: 'success',
          msg: 'Emails will be sent to the users'
      });
  } else {
      res.status(400).json({
          status: 'fail',
          msg: 'Emails will not be sent to the users since no users and/or subject is provided'
      });

      return new BAError('No subject or/and no users provided', 400);
  }

});


module.exports = {
  sendMail
}
