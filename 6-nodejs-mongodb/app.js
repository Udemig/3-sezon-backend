const express = require('express');
var morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');

const app = express();

// istek detylarını konsola yazan middlware
app.use(morgan('dev'));

// body headers vs. gelen json verisini js'de kullanbilir formata getirir
app.use(express.json());

// tour route'larını projeye tanıt
app.use(tourRouter);

module.exports = app;
