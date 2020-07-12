const sharp = require('sharp');

const resizeUserPhoto = () => (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`

  sharp(req.file.buffer)
  .resize(140, 140)
  .toFormat('jpg')
  .jpeg({quality: 60})
  .toFile(`server/public/img/users/${req.file.filename}`);

  next()
};

module.exports = {
  resizeUserPhoto
}
