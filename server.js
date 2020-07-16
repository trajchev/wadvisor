const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./server/app');
const sequelize = require('./server/utils/database');

const port = process.env.PORT || 3300;
app.set('port', port);

console.log(process.env.API_URL)

// app.listen(port);

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(port);
})
.catch(err => {
    console.log(err)
});
