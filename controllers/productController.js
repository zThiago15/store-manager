const productsServices = require('../services/productsServices');

const selectAll = async (req, res, _next) => {
  const products = await productsServices.selectAll();

  return res.status(200).json(products);
};

const selectById = async (req, res, _next) => {
  const { id } = req.params;

  const product = await productsServices.getById(id);
  return res.status(200).json(product);
};

module.exports = { selectAll, selectById };
