const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;

  const saleExists = await salesModel.selectById(id);
  if (saleExists.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const verifyIfIdAndQuantityExists = async (req, res, next) => {
  const sale = req.body;

  const productNotFound = sale.filter(({ productId }) => !productId);
  if (productNotFound.length !== 0) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const quantityNotFound = sale
    .filter(({ quantity }) => quantity === undefined || quantity === '');
  if (quantityNotFound.length !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validateIdAndQuantity = async (req, res, next) => {
  const sale = req.body;

  const quantityErrors = sale.some(({ quantity }) => quantity <= 0);
  if (quantityErrors) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const salesProducts = sale.map(async ({ productId }) => {
    const product = await productsModel.getById(productId);

    return product;
  });

  // Promise.all() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  const products = await Promise.all(salesProducts);

  if (products.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { validateSaleId, verifyIfIdAndQuantityExists, validateIdAndQuantity };