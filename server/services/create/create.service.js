const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');

const create = Model => catchAsync(async (req, res, next) => {

  let doc;

  if (req.user.id) {
      doc = await Model.create({user_id: +req.user.id, ...req.body});
  } else {
      doc = await Model.create({...req.body});
  }

  if(!doc) {
      res.status(404).json({
          status: 'failure',
          message: 'The document could not be created'
      });
      return next(new BAError('The document could not be created', 404));
  } else {
      res.status(201).json({
          status: 'success',
          data: doc
      });
  }

});

const createBetMatch = Model => catchAsync(async (req, res, next) => {

  const user_id = +req.user.id;

  const doc = await Model.create({
      user_id,
      ticket_id: req.body.ticket_id,
      match_id: req.body.match_id,
      tip: req.body.tip
  });

  if (!doc) {
      res.status(404).json({status: 'failure', message: 'The document could not be created'});
      return next(new BAError('The document could not be created', 404));
  }

  res.status(201).json({
      status: 'success',
      data: doc
  });

});

module.exports = {
  create,
  createAssoc,
  createBetMatch
}
