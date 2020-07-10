const { User } = require("../../models");
const { read, update, remove, email, customer } = require('../../services');
const upload = require("../../utils/upload");

const uploadUserPhoto = upload.single('photo');
const updateUser = update.update(User);
const updateMe = update.updateUser(User);
const getUser = read.readUser(User);
const getAllUsers = read.readUsers(User);
const getMe = (req, res, next) => {
  const userId = req.user.id;
  req.params.id = userId;
  next();
};
const emailUsers = email.sendMail(User);
const createCustomer = customer.createCustomer(User);
const createSubscription = customer.createSubscription(User);
const retryInvoice = customer.retryInvoice(User);
const cancelSubscription = customer.cancelSubscription(User);
const updateSubscription = customer.updateSubscription(User);
const retrievePaymentMethod = customer.retrievePaymentMethod(User);
const retrieveUpcomingInvoice = customer.retrieveUpcomingInvoice(User);
const deleteUser = remove.remove(User);
const deleteMe = remove.removeUser(User);

module.exports = {
  uploadUserPhoto,
  updateUser,
  updateMe,
  getUser,
  getAllUsers,
  getMe,
  deleteUser,
  deleteMe,
  createCustomer,
  createSubscription,
  retryInvoice,
  cancelSubscription,
  updateSubscription,
  retrievePaymentMethod,
  retrieveUpcomingInvoice,
  emailUsers
};
