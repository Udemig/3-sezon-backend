const express = require('express');
var morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// istek detylarını konsola yazan middlware
app.use(morgan('dev'));

// body headers vs. gelen json verisini js'de kullanbilir formata getirir
app.use(express.json());

// tour ve user route'larını projeye tanıt
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
