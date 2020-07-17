const path = require('path');
const express = require('express');
const hpp = require('hpp');

const { faq, user, league, match, site, page, team, ticket } = require('./routes');

const app = express();

// Prevent parameter pollution
app.use(hpp({whitelist: ['token', 'page', 'id', 'league', 'matchId', 'group']}))
app.use(compression());

// Set up headers for allowing requests from API CONSUMER (me :) )
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

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
