import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../../errors/bad-request-error';
import { catchAsync } from '../../utils/catch-async';

const create = ( Model: any ) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  let doc;

  if (req.user && req.user.id) {
    doc = await Model.create({user_id: +req.user.id, ...req.body});
  } else {
    doc = await Model.create({...req.body});
  }

  if(!doc) {
    res.status(404).json({
      status: 'failure',
      message: 'The document could not be created'
    });
    return next(new BadRequestError('The document could not be created'));
  } else {
    res.status(201).json({
      status: 'success',
      data: doc
    });
  }
});

const createBetMatch = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const user_id = +req.user.id;

  const doc = await Model.create({
    user_id,
    ticket_id: req.body.ticket_id,
    match_id: req.body.match_id,
    tip: req.body.tip
  });

  if (!doc) {
    res.status(404).json({
      status: 'failure',
      message: 'The document could not be created'
    });
    return next(new BadRequestError('The document could not be created'));
  }

  res.status(201).json({
    status: 'success',
    data: doc
  });

});

export { create, createBetMatch }
