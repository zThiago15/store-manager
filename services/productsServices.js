const productsModel = require('../models/productsModel');

const selectAll = async () => {
  const response = await productsModel.selectAll();

  return response;
};

const getById = async (id) => {
  const response = await productsModel.getById(id);

  return response;
};

module.exports = { selectAll, getById };