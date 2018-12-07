const express = require('express');
const { ApiError } = require('../exceptions/api');

const router = express.Router();
const controller = require('../controllers/gnomes');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.get('/', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Hello from gnomes app' })));

router.get('/gnomes', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Gnome 3' })));

router.post('/gnomes', asyncMiddleware(async (req, res, next) => {
  const createdGnome = await controller.addGnome(req.body);

  res
    .status(201)
    .json({
      message: 'Gnome created',
      payload: createdGnome.toJSON(),
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


router.use((err, req, res, next) => {
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Something goes wrong :(' });
});

module.exports = router;
