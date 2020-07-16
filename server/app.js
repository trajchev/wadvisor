const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { user, league, match, site, page, team, faq, ticket } = require('./routes');
const BAError = require('./utils/BAError');

const app = express();
app.enable('trust proxy');


// Body parser and cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up headers for allowing requests from API CONSUMER (me :) )
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

// 2. ROUTES
app.use('/api/v1/users', user);
app.use('/api/v1/leagues', league);
app.use('/api/v1/matches', match);
app.use('/api/v1/sites', site);
app.use('/api/v1/pages', page)
app.use('/api/v1/teams', team);
app.use('/api/v1/faq', faq);
app.use('/api/v1/tickets', ticket);

app.use('/', express.static(path.join(__dirname, 'angular')));
app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
});

app.all('*', (req, res, next) => {
  next(new BAError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
