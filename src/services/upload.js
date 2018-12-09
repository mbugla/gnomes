const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const { ApiError } = require('../exceptions/api');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/avatars/');
    },
    filename: (req, file, cb) => {
      const customFileName = crypto.randomBytes(18).toString('hex');
      const fileExtension = path.extname(file.originalname);
      cb(null, `${customFileName}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png') {
      cb(new ApiError(`Wrong filetype. Given: ${file.mimetype}, allowed image/png`, 400));
    }
    cb(null, true);
  },
});

module.exports = {
  upload,
};
