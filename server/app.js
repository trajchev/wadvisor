const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { data } = require('./services');

const { faq, user, league, match, site, page, team, ticket } = require('./routes');
const BAError = require('./utils/BAError');

const app = express();
app.enable('trust proxy');

// Implement CORS
app.use(cors());
app.options('*', cors());

// Use helmet for setting basic security headers
app.use(helmet());

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Body parser and cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Prevent XSS
app.use(xss());
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

// Get data
data.getSportsRecurring();
data.getOddsRecurring();

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
