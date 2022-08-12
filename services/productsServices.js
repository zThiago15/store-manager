const productsModel = require('../models/productsModel');

const selectAll = async () => {
  const response = await productsModel.selectAll();

  return response;
};

const getById = async (id) => {
  const response = await productsModel.getById(id);

  return response;
};

const create = async (name) => {
  const response = await productsModel.create(name);

  return { id: response.insertId, name };
};

module.exports = { selectAll, getById, create };