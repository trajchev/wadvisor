const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./server/app');
<<<<<<< HEAD
const sequelize = require('./server/utils/database');
=======
// const sequelize = require('./server/utils/db');
>>>>>>> master

const port = process.env.PORT || 3300;
app.set('port', port);

<<<<<<< HEAD
// Dev logging
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
=======
app.listen(port);

// sequelize.sync()
// .then(result => {
//     // console.log(result);
//     app.listen(port);
// })
// .catch(err => {
//     console.log(err)
// });
>>>>>>> master
