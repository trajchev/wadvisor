// const sharp = require('sharp');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const resizeUserPhoto = () => (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

  // sharp(req.file.buffer)
  // .resize(200, 200)
  // .toFormat('jpeg')
  // .jpeg({quality: 60})
  // .toBuffer()
  // .then(buffer => {
  //   s3.putObject({
  //     Bucket: process.env.S3_BUCKET_NAME,
  //     Key: `users/${req.file.filename}`,
  //     ContentType: 'image/jpeg',
  //     Body: buffer
  //   }, (err, data) => {
  //     if (err) throw err;
  //   })
  // });

  next()
};

const resizeTeamPhoto = () => (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `team-${Date.now()}.jpeg`

  // sharp(req.file.buffer)
  // .resize(140, 140)
  // .toFormat('jpeg')
  // .jpeg({quality: 60})
  // .toBuffer()
  // .then(buffer => {
  //   s3.putObject({
  //     Bucket: process.env.S3_BUCKET_NAME,
  //     Key: `teams/${req.file.filename}`,
  //     ContentType: 'image/jpeg',
  //     Body: buffer
  //   }, (err, data) => {
  //     if (err) throw err;
  //   })
  // });

  next()
}

module.exports = {
  resizeUserPhoto,
  resizeTeamPhoto
}
