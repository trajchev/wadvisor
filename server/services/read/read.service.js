const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');

const read = (Model, included = null, attrs = null) => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({where: {id: req.params.id},
    attributes: attrs,
    include: included
  });

  if (!doc) {
      res.status(404).json({
          status: 'failure',
          msg: 'No Document found with that id'
      });
      return next(new BAError('No Document found with that id', 404));}

  res.status(200).json({
      status: 'success',
      data: doc
  });

});

const readAll = (
  Model,
  included = null,
  order = null,
  limit = null,
  offset = null,
  attrs = null
) => catchAsync(async(req, res, next) => {

  if (req.params.page) {
    limit = +req.params.perPage;
    page = +req.params.page;
    offset = (page - 1) * limit;
  }

  let filter = {};

  if (req.params.ticketId) { filter.ticket = req.params.ticketId };
  if (req.params.group) { filter.group = req.params.group };
  if (req.params.league) { filter.sport_key = req.params.league };
  if (req.params.role) { filter.role = req.params.role };

  const occurences = await Model.count({where: filter, include: included});

  const docs = await Model.findAll({order, limit, offset, where: filter,
    attributes: attrs,
    include: included
  });

  if (!docs) {
    res.status(404).json({
        status: 'failure',
        message: 'No Documents found'
    });
    return next(new BAError('No Document found', 404));
  }

  res.status(200).json({
    status: 'success',
    stats: {
      records: occurences,
      perpage: limit,
      current: docs.length,
      offset: offset
    },
    data: docs
  });

});

const readAllSports = (Model, included, atrs) => catchAsync( async(req, res, next) => {
  const docs = await Model.findAll({
      attributes: atrs,
      include: included
  });

  if (!docs) {
      res.status(404).json({
          status: 'failure',
          message: 'No Documents found'
      });
      return next(new BAError('No Document found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: docs
  });

});

const readAllProprietary = (Model, includedModels, order) => catchAsync(async (req, res, next) => {
  let limit,
    page = 1,
    offset;

  if (req.params.perPage && req.params.page) {
    limit = +req.params.perPage;
    page = +req.params.page;
    offset = (page - 1) * limit;
  }

  const userId = req.user.id;

  const occurences = await Model.count({
    where: { userId },
    include: includedModels,
  });
  const docs = await Model.findAll({
    order: order,
    limit,
    offset,
    where: { userId },
    include: includedModels,
  });

  if (!docs) {
    res.status(404).json({
      status: "failure",
      message: "No Document found",
    });
    return next(new BAError("No Document found", 404));
  }

  res.status(200).json({
    status: "success",
    stats: {
      records: occurences,
      perpage: limit,
      current: docs.length,
      offset: offset,
    },
    data: docs,
  });
});

const readUser = (Model, attrs = null) => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({
      where: {id: req.params.id},
      attributes: attrs
  });

  if (!doc) {

      res.status(404).json({
          status: 'failure',
          message: 'No Document found with that id'
      });

      return next(new BAError('No Document found with that id', 404));
  }

  const photo = doc.photo;
  doc.photo = `https://bwr-img.s3.eu-west-3.amazonaws.com/users/${photo}`;

  res.status(200).json({
      status: 'success',
      data: doc
  });

});

module.exports = {
  read, readAll,
  readUser,
  readAllSports,
  readAllProprietary
}
