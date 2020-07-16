const multer = require('multer');
const BAError = require('../../utils/BAError');

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
