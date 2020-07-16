const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: './config.env'});

const app = require('./server/app');
const sequelize = require('./server/utils/database');

const port = process.env.PORT || 8080;
app.set('port', port);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

sequelize.sync()
.then(result => {
    app.listen(port);
})
.catch(err => {
    console.log(err)
});
