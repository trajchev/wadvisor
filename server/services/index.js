const create = require('./create/create.service');
const read = require('./read/read.service');
const update = require('./update/update.service');
const remove = require('./remove/remove.service');

module.exports = {
  create, read, update, remove
}
