const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const router = require('./routes/routing');

app.use(bodyParser.json());

app.use('/api/v1', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Page not Found. Check /api/v1/api-docs for available endpoints.' });
});

app.listen(port);

module.exports = app;
