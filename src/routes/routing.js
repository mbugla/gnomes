const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const { ApiError } = require('../exceptions/api');
const { upload } = require('../services/upload');
const { createGnomeSchema, updateGnomeSchema } = require('../validations/gnomes');

const router = express.Router();
const controller = require('../controllers/gnomes');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.get('/', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Welcome in gnomes app api. Check /api-docs endpoint for documentation' })));

router.get('/gnomes', asyncMiddleware(async (req, res) => {
  const gnomes = await controller.getGnomes();

  res
    .status(200)
    .json({
      payload: gnomes,
    });
}));

router.post('/gnomes', asyncMiddleware(async (req, res, next) => {
  try {
    await createGnomeSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    throw new ApiError(error, 400);
  }
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
  try {
    await updateGnomeSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    throw new ApiError(error, 400);
  }

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

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use((err, req, res, next) => {
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Something goes wrong :(' });
});

module.exports = router;
