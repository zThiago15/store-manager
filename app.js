const express = require('express');
const productsController = require('./controllers/productController');
const salesController = require('./controllers/saleController');

const middlewaresProducts = require('./middlewares/products');
const { validateSaleId, verifyIfIdAndQuantityExists,
  validateIdAndQuantity } = require('./middlewares/sales');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.selectAll);
app.get('/products/:id', middlewaresProducts.validateProductId, productsController.selectById);
app.post('/products', middlewaresProducts.validateNameProduct, productsController.create);
app.put('/products/:id', middlewaresProducts.validateProductId,
  middlewaresProducts.validateNameProduct, productsController.update);
app.delete('/products/:id', middlewaresProducts.validateProductId, productsController.remove);

app.get('/sales', salesController.selectAll);
app.get('/sales/:id', validateSaleId, salesController.selectById);
app.post('/sales', verifyIfIdAndQuantityExists, validateIdAndQuantity, salesController.create);
app.put('/sales/:id', validateSaleId, verifyIfIdAndQuantityExists,
  validateIdAndQuantity, salesController.update);
app.delete('/sales/:id', salesController.remove);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
