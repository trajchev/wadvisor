const path = require('path');
const express = require('express');

const app = express()

app.get('/api/vi', (req, res, next) => {
  res.send(`Hello from ${process.env.API_URL}`);
})

app.use('/', express.static(path.join(__dirname, 'angular')));
app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
});

module.exports = app
