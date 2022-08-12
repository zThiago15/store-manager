const productsServices = require('../services/productsServices');

const validateProduct = async (req, res, next) => {
  const { id } = req.params;
  
  const productExists = await productsServices.getById(id);
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateNameProduct = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = { validateProduct, validateNameProduct };