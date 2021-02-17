const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// route test app
app.get('/', (req, res)=>{
    res.json("Hello World");
});



app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`)
})