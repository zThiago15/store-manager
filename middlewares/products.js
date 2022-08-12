const productsServices = require('../services/productsServices');

const validateProduct = async (req, res, next) => {
  const { id } = req.params;
  
  const productExists = await productsServices.getById(id);
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { validateProduct };