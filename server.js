const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./server/app');
// const sequelize = require('./server/utils/db');

const port = process.env.PORT || 3300;
app.set('port', port);

app.listen(port);

// sequelize.sync()
// .then(result => {
//     // console.log(result);
//     app.listen(port);
// })
// .catch(err => {
//     console.log(err)
// });
