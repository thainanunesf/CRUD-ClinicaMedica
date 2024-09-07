const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/connection');
const pacienteRoutes = require('./routes/pacienteRoutes');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use('/', pacienteRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
});
