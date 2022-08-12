const express = require('express');
const productsController = require('./controllers/productController');
const middlewares = require('./middlewares/products');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.selectAll);
app.get('/products/:id', middlewares.validateProduct, productsController.selectById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;