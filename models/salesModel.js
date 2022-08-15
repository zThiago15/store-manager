const connection = require('./connection');

const create = async (sale, date) => {
  try {
    const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
    const [{ insertId }] = await connection.execute(querySale, [date]);
    
    const responses = { id: insertId, itemsSold: sale };
    sale.forEach(async ({ productId, quantity }) => {
      const querySalesProduct = `INSERT INTO StoreManager.sales_products 
        (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
      await connection.execute(querySalesProduct, [insertId, productId, quantity]);
    });

    return responses;
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
