const express = require('express');
const bodyParser = require('body-parser');
const rutas = require('./routes/rutas'); 
const app = express();
const path = require('path');
const puerto = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', rutas);
app.set('view engine', 'ejs');
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});
