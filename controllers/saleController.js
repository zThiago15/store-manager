const salesServices = require('../services/salesServices');

const selectAll = async (_req, res, _next) => {
  const sales = await salesServices.selectAll();

  return res.status(200).json(sales);
};

const selectById = async (req, res, _next) => {
  const { id } = req.params;

  const sale = await salesServices.selectById(id);

  return res.status(200).json(sale);
};

module.exports = { selectAll, selectById };