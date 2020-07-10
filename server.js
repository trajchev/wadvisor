const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: './config.env'});

const app = require('./server/app');
// const sequelize = require('./server/utils/database');

const port = process.env.PORT || 3300;
app.set('port', port);

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.listen(port);

// sequelize.sync()
// .then(result => {
//     // console.log(result);
//     app.listen(port);
// })
// .catch(err => {
//     console.log(err)
// });
