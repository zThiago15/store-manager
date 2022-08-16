const salesServices = require('../services/salesServices');

const selectAll = async (req, res, _next) => {
  const sales = await salesServices.selectAll();

  return res.status(200).json(sales);
};

const selectById = async (req, res, _next) => {
  const { id } = req.params;

  const sale = await salesServices.selectById(id);

  return res.status(200).json(sale);
};

const create = async (req, res, _next) => {
  const sale = req.body;

  const createdSale = await salesServices.create(sale);

  return res.status(201).json(createdSale);
};

const update = async (req, res, _next) => {
  const { id } = req.params;

  const sale = req.body;

  const updatedSale = await salesServices.update(id, sale);

  return res.status(200).json(updatedSale);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  await salesServices.remove(id);

  return res.status(204).end();
};

module.exports = { selectAll, selectById, create, remove, update };