const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.get('/', async (req, res, next) => {
    return res.status(200).json({msg: "Hello from gnomes app"})
});

router.get('/gnomes', async (req, res, next) => {
    return res.status(200).json({msg: "Gnome 3"})
});

module.exports = router;