const create = require('./create/create.service');
const read = require('./read/read.service');
const update = require('./update/update.service');
const remove = require('./remove/remove.service');
const email = require('./email/email.service');
const resize = require('./resize/resize.service');
const upload = require('./upload/upload.service');

module.exports = {
  create, read, update, remove, email, resize, upload
}
