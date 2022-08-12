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

const create = async (req, res, _next) => {
  const { name } = req.body;

  const productCreated = await productsServices.create(name);

  return res.status(201).json(productCreated);
};

module.exports = { selectAll, selectById, create };
