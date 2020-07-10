const catchAsync = require('../utils/catch-async');
const BAError = require('../utils/BAError');

const remove = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.destroy({where: {id: req.params.id}});

    if (!doc) {
        res.status(404).json({
            status: 'failure',
            msg: 'No document found with that id'
        });
        return next(new BAError('No document found with that id', 404));
    }

    res.status(204).json({
        status: 'success',
        msg: 'Document deleted'
    });

});

const removeUser = Model => catchAsync( async (req, res, next) => {

  const doc = await Model.update({active: false}, {where: {id: req.user.id}});

  if (!doc) {
    res.status(404).json({
        status: 'failure',
        msg: 'No User found with that id'
    });
    return next(new BAError('No User found with that id', 404));
  }

  res.status(204).json({
      status: 'success',
      msg: 'User deleted'
  });

});

const removeAssociatedResource = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.destroy({where: {id: req.params.id}});

  if (!doc) {
      res.status(404).json({
          status: 'failure',
          msg: 'No document found with that id'
      });
      return next(new BAError('No document found with that id', 404));
  }

  res.status(204).json({
      status: 'success',
      msg: 'Document deleted'
  });

});

module.exports = {
  remove,
  removeUser,
  removeAssociatedResource
};
