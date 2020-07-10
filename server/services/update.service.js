const catchAsync = require('../utils/catch-async');
const BAError = require('../utils/BAError');
const filterObj = require('../utils/filter-obj');

const update = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.update(req.body, { where: { id: req.params.id } });

  if (!doc) {
      res.status(404).json({
          status: 'failure',
          msg: 'No document found with that id'
      });
      return next(new BAError('No document with that ID found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: doc
  });

});


const updateUser = Model => catchAsync(async (req, res, next) => {

  // 1. Create error if user posts pass data
  if (req.body.password || req.body.passwordConfirm) {
      return next(new BAError('This route is not for password updates', 400));
  }

  // 2. Exclude not allowed fields
  const filteredBody = filterObj(req.body, 'username', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3. Update user
  await Model.update(filteredBody, {where: {id: req.user.id}, returning: true, plain: true});
  const user = await Model.findOne({where: {id: req.user.id}, attributes: ['photo']});

  res.status(202).json({
      status: 'success',
      data: user
  });

});

module.exports = {
  update, updateUser
}
