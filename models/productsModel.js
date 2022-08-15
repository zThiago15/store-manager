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
  try {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

    const [response] = await connection.execute(query, [name, id]);

    if (typeof response !== 'object') {
      throw new Error('id inválido');
    }

    return response;
  } catch (err) {
    return err.message;
  }
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

module.exports = { selectAll, create, update, remove, getById };