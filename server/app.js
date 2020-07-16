const path = require('path');
const express = require('express');

const { faq, user } = require('./routes');

const app = express();

// Routes
app.use('/api/v1/users', user);
app.use('/api/v1/faq', faq);

app.use('/', express.static(path.join(__dirname, 'angular')));
app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
});

module.exports = app
