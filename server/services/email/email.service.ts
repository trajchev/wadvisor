import { Request, Response, NextFunction } from 'express';

import Email from '../../utils/Email';
import { catchAsync } from '../../utils/catch-async';
import { mailTemplates } from '../../models/constants/enums';
import { BadRequestError } from '../../errors/bad-request-error';

const sendMail = ( Model: any ) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const users = req.body.users;
  const subject = req.body.subject;

  if (users && subject) {
    users.forEach((user, idx) => {
      setTimeout( async () => {
        await new Email(user, 'https://affiliate.link.com').send(mailTemplates.AFFILIATE, subject);
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

    return new BadRequestError('No subject or/and no users provided');
  }

});

export default sendMail;
