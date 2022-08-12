const connection = require('./connection');

const selectAll = async () => { 
  const response = await connection.execute('SELECT id, name FROM StoreManager.products');

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

    const response = await connection.execute(query, [name, id]);

    if (!response) {
      throw new Error('id inválido');
    }

    return true;
  } catch (err) {
    return err.message;
  }
};

const remove = async (id) => {
  try {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';
    const response = await connection.execute(query, [id]);

    if (!response) {
      throw new Error('id inválido');
    }

    return true;
  } catch (err) {
    return err.message;
  }
};

module.exports = { selectAll, create, update, remove };