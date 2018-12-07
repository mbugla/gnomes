const express = require('express');

const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.get('/', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Hello from gnomes app' })));

router.get('/gnomes', asyncMiddleware(async (req, res, next) => res.status(200).json({ msg: 'Gnome 3' })));

module.exports = router;
