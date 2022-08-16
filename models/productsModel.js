const connection = require('./connection');

const selectAll = async () => { 
  const [response] = await connection.execute('SELECT id, name FROM StoreManager.products');

  return response;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [response] = await connection.execute(query, [name]);

  return response;
};

const update = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

  const [response] = await connection.execute(query, [name, id]);

  return response;
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const response = await connection.execute(query, [id]);
  
  return response;
};

const getById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[response]] = await connection.execute(query, [id]);

    return response;
};

const search = async (searchTerm) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [response] = await connection.execute(query, [`%${searchTerm}%`]);

  return response;
};

module.exports = { selectAll, create, update, remove, getById, search };