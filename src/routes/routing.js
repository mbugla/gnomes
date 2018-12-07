const express = require('express');
const multer = require('multer');
const crypto = require('crypto');

const { ApiError } = require('../exceptions/api');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/avatars/');
    },
    filename: (req, file, cb) => {
      const customFileName = crypto.randomBytes(18).toString('hex');


      const fileExtension = file.originalname.split('.')[1]; // get file extension from original file name
      cb(null, `${customFileName}.${fileExtension}`);
    },
  }),
});

const router = express.Router();
const controller = require('../controllers/gnomes');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.get('/', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Hello from gnomes app' })));

router.get('/gnomes', asyncMiddleware(async (req, res) => {
  const gnomes = await controller.getGnomes();

  res
    .status(200)
    .json({
      payload: gnomes,
    });
}));

router.post('/gnomes', asyncMiddleware(async (req, res, next) => {
  const createdGnome = await controller.addGnome(req.body);

  res
    .status(201)
    .json({
      message: 'Gnome created',
      payload: createdGnome.toJSON(),
    });
}));


router.post('/gnomes/:id/avatar', upload.single('avatar'), asyncMiddleware(async (req, res, next) => {
  const gnome = await controller.updateAvatar(req.params.id, req.file.filename);

  res
    .status(201)
    .json({
      message: 'Avatar updated',
      payload: gnome.toJSON(),
    });
}));

router.put('/gnomes/:id', asyncMiddleware(async (req, res, next) => {
  const updatedGnome = await controller.updateGnome(req.params.id, req.body);

  res
    .status(200)
    .json({
      message: 'Gnome updated',
      payload: updatedGnome.toJSON(),
    });
}));

router.get('/gnomes/:id', asyncMiddleware(async (req, res, next) => {
  const gnome = await controller.getGnomeById(req.params.id);

  res
    .status(200)
    .json({
      payload: gnome.toJSON(),
    });
}));

router.delete('/gnomes/:id', asyncMiddleware(async (req, res, next) => {
  await controller.removeGnomeById(req.params.id);

  res
    .status(204)
    .json({
      message: 'Gnome deleted',
    });
}));


router.use((err, req, res, next) => {
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Something goes wrong :(' });
});


module.exports = router;
