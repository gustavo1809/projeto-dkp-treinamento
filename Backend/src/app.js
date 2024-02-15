const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({origin: "*"}));

const funcionarios = require('./routes/funcionario');
app.use('/routes/funcionarios', funcionarios);

const dependentes = require('./routes/dependente');
app.use('/routes/dependentes', dependentes);

const carro = require('./routes/carro');
app.use('/routes/carros', carro);

const marca = require('./routes/marca');
app.use('/routes/marcas', marca);

module.exports = app;
