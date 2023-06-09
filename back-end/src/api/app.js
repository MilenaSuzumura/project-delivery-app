const express = require('express');

const customerRouter = require('../routers/customer.router');
const sellerRouter = require('../routers/seller.router');
const userRouter = require('../routers/user.router');

const app = express();

// Função que serve para que se possa testar as requisições pelo navegador web, não influencia nos testes 
// mas mantive comentada pois não é necessária para que os mesmos rodem.
// Feito por: Bruno Faraco com ajuda do ChatGPT fazendo a seguinte pergunta:
// "como resolver o problema "Access-Control-Allow-Origin" do Axios em React"
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, authorization');
  next();
});

app.use(express.json());
app.use(express.static('public'));

app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);
app.use(userRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
