const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const validate = require('express-validator');

app.use(validate());

const router = require('./routes/routing');

app.use(bodyParser.json());

app.use('/', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Page not Found' });
});

app.listen(port);

module.exports = app;
