const express = require('express');
const productsController = require('./controllers/productController');
const salesController = require('./controllers/saleController');

const middlewaresProducts = require('./middlewares/products');
const middlewaresSales = require('./middlewares/sales');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.selectAll);
app.get('/products/:id', middlewaresProducts.validateProduct, productsController.selectById);
app.post('/products', middlewaresProducts.validateNameProduct, productsController.create);

app.get('/sales', salesController.selectAll);

app.get('/sales/:id', middlewaresSales.validateSaleId, salesController.selectById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

/* --fazer
[endppoint('/..') para listar vendas e vendaById]
[valid -> n é possível listar venda q n existe] */
