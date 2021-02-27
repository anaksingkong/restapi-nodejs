const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/mhs-routes.js'); // memanggil routes
const morgan = require('morgan');
const app = express();


const port = 3000;

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Tell express where to serve static files from
app.use(express.static(__dirname + '/public'));

// memanggil morgan
app.use(morgan('dev'));

// memanggil fungsi app pada routes
routes(app);

// menetapkan auth url
app.use('/auth', require('./middleware'));

app.listen(port, () => {
    console.log(`🌎 ==> Server berjalan pada port ${port}`)
});

// app.listen(app.get('port'));