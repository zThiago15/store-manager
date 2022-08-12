const connection = require('./connection');

const create = async (saleId, productId, quantity) => {
  try {
    const querySale = 'INSERT INTO StoreManager.sales (id) VALUES (?)';
    await connection.execute(querySale, [saleId]);

    const querySalesProduct = `INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const response = await connection.execute(querySalesProduct, [saleId, productId, quantity]);

    if (!response) {
      throw new Error('Dados inválidos');
    }

    return response;
  } catch (err) {
    return err.message;
  }
};

module.exports = { create };
