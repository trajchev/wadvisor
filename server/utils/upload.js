const multer = require('multer');
const BAError = require('./BAError');

// Multer setup
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'server/public/img/users/');
//     },
//     filename: (req, file, cb) => {
//         // user -id - timestamp - extention
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new BAError('The uploaded file is not an image!', 400));
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload;
