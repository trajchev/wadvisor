const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');

const read = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({where: {id: req.params.id}});

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

const readAll = Model => catchAsync(async (req, res, next) => {

  let limit, page = 1, offset;

  if (req.params.page) {
      limit = +req.params.perPage;
      page = +req.params.page;
      offset = (page - 1) * limit;
  }

  // To allow for nested GET reviews on ticket
  let filter = {};

  if (req.params.ticketId) filter = { ticket: req.params.ticketId };
  if (req.params.group) { filter.group = req.params.group };
  if (req.params.league) { filter.sport_key = req.params.league };

  const occurences = await Model.count({where: filter});
  const docs = await Model.findAll({limit, offset, where: filter});

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

const readAllSports = (Model, AssocModel) => catchAsync( async(req, res, next) => {
  const docs = await Model.findAll({
      attributes: ['title'],
      include: [{
          model: AssocModel,
          attributes: ['key', 'active', 'details', 'title']
      }],
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

const readAssociated = (Model, includedModels) => catchAsync( async(req, res, next) => {

  const docs = await Model.findOne({ where: { id: req.params.id },
      include: includedModels
  });

  if (!docs) {
      res.status(404).json({
          status: 'failure',
          msg: 'No Document found with that id'
      });
      return next(new BAError('No Document found with that id', 404));
  }

  res.status(200).json({
      status: 'success',
      data: docs
  });

});

const readBySlug = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({where: {slug: req.params.slug}});

  if (!doc) {
      res.status(404).json({
          status: 'failure',
          msg: 'No Document found with that slug'
      });
      return next(new BAError('No Document found with that slug', 404));
  }

  res.status(200).json({
      status: 'success',
      data: doc
  });
});

const readAssociatedPaginated = (Model, includedModels, order) => catchAsync(async (req, res, next) => {
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

const readUser = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({
      where: {id: req.params.id},
      attributes: ['username', 'email', 'photo', 'role', 'recruits']
  });

  if (!doc) {

      res.status(404).json({
          status: 'failure',
          message: 'No Document found with that id'
      });

      return next(new BAError('No Document found with that id', 404));
  }

  const photo = doc.photo;
  doc.photo = `${process.env.BASE_URL}img/users/${photo}`;

  res.status(200).json({
      status: 'success',
      data: doc
  });

});

const readUsers = Model => catchAsync(async (req, res, next) => {

  let limit, page = 1, offset;

  if (req.params.page) {
      limit = +req.params.perPage;
      page = +req.params.page;
      offset = (page - 1) * limit;
  }

  // To allow for nested GET reviews on ticket
  let filter = {};
  if (req.params.role) { filter.role = req.params.role };
  const occurences = await Model.count({where: filter});
  const docs = await Model.findAll({limit, offset, where: filter,
      attributes: ['id', 'username', 'email', 'role', 'recruits', 'recruiter_id']
  });

  if (!docs) {

      res.status(404).json({
          status: 'failure',
          message: 'No Documents found'
      });

      return next(new BAError('No Documents found', 404));
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

module.exports = {
  read, readAll,
  readUser, readUsers,
  readAllSports, readBySlug,
  readAssociated,  readAssociatedPaginated,
}
