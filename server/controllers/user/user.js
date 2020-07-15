const { User } = require("../../models");
const { read, update, remove, email, resize, upload } = require('../../services');

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
const deleteUser = remove.remove(User);
const deleteMe = remove.removeUser(User);
const resizeUserPhoto = resize.resizeUserPhoto();

module.exports = {
  uploadUserPhoto,
  updateUser,
  updateMe,
  getUser,
  getAllUsers,
  getMe,
  deleteUser,
  deleteMe,
  emailUsers,
  resizeUserPhoto
};
