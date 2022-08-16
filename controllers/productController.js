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

const update = async (req, res, _next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const productUpdated = await productsServices.update(id, name);
  return res.status(200).json(productUpdated);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  await productsServices.remove(id);

  return res.status(204).end();
};

const search = async (req, res, _next) => {
  const { q } = req.query;

  const products = await productsServices.search(q);
  return res.status(200).json(products);
};

module.exports = { selectAll, selectById, create, update, remove, search };
