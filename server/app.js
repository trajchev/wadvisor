const path = require('path');
const express = require('express');

const { faq, user, league, match, site, page, team, ticket } = require('./routes');

const app = express();

// Routes
app.use('/api/v1/users', user);
app.use('/api/v1/leagues', league);
app.use('/api/v1/matches', match);
app.use('/api/v1/sites', site);
app.use('/api/v1/pages', page);
app.use('/api/v1/teams', team);
app.use('/api/v1/tickets', ticket);
app.use('/api/v1/faq', faq);

app.use('/', express.static(path.join(__dirname, 'angular')));
app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
});

app.all('*', (req, res, next) => {
  next(new BAError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app
