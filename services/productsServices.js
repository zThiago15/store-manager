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

const update = async (id, name) => {
  await productsModel.update(name, id);

  return { id, name };
};

const remove = async (id) => {
  const response = await productsModel.remove(id);

  return response;
};

const search = async (searchTerm) => {
  const response = await productsModel.search(searchTerm);

  if (response.length === 0) {
    return selectAll();
  }

  return response;
};

module.exports = { selectAll, getById, create, update, remove, search };