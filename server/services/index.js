const create = require('./create/create.service');
const read = require('./read/read.service');
const update = require('./update/update.service');
const remove = require('./delete/delete.service');
const customer = require('./customer/customer.service');
const email = require('./email/email.service');

module.exports = {
  create, read, update, remove, customer, email
}