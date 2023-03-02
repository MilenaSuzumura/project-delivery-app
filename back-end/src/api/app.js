const express = require('express');

const userRouter = require('../routers/user.router');
const customerProductsRouter = require('../routers/customer-products.router');

const app = express();

// Função que serbe para que se possa testar as requisições pelo navegador web, não influencia nos testes 
// mas mantive comentada pois não é necessária para que os mesmos rodem.
// Feito por: Bruno Faraco com ajuda do ChatGPT fazendo a seguinte pergunta:
// "como resolver o problema "Access-Control-Allow-Origin" do Axios em React"
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());

app.use(userRouter);
app.use(customerProductsRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
