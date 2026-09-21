const express = require('express');
const apiRoutes = require('./routes');
const { notFoundHandler } = require('./middlewares/not-found.middleware');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use('/api/v1', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;