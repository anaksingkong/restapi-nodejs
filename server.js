const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/mhs-routes.js'); // memanggil routes
const app = express();
const port = 3000;

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// memanggil fungsi app pada routes
routes(app);

app.listen(port, () => {
    console.log(`🌎 ==> Server berjalan pada port ${port}`)
})