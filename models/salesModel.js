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

const selectAll = async () => {
  try {
    const query = `SELECT sale_id, sa.date, product_id, quantity 
      FROM StoreManager.sales_products AS sa_pr
      INNER JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
      ORDER BY sa_pr.sale_id, sa_pr.product_id`;
    const [response] = await connection.execute(query);

    return response;
  } catch (err) {
    return err.message;
  }
};

const selectById = async (id) => {
  try { 
    const query = `SELECT sa.date, product_id, quantity FROM StoreManager.sales_products AS sa_pr
      INNER JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
      WHERE sa.id = ?
      ORDER BY sa_pr.sale_id, sa_pr.product_id`;
    
    const [response] = await connection.execute(query, [id]);

    return response;
  } catch (err) {
    return err.message;
  }
};

module.exports = { create, selectAll, selectById };
