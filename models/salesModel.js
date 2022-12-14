const connection = require('./connection');

const create = async (sale, date) => {
    const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
    const [{ insertId }] = await connection.execute(querySale, [date]);
    
    const responses = { id: insertId, itemsSold: sale };
    sale.forEach(async ({ productId, quantity }) => {
      const querySalesProduct = `INSERT INTO StoreManager.sales_products 
        (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
      await connection.execute(querySalesProduct, [insertId, productId, quantity]);
    });

    return responses;
};

const selectAll = async () => {
  const query = `SELECT sale_id, sa.date, product_id, quantity 
    FROM StoreManager.sales_products AS sa_pr
    INNER JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
    ORDER BY sa_pr.sale_id, sa_pr.product_id`;
  const [response] = await connection.execute(query);

  return response;
};

const selectById = async (id) => {
  const query = `SELECT sa.date, product_id, quantity FROM StoreManager.sales_products AS sa_pr
    INNER JOIN StoreManager.sales AS sa ON sa.id = sa_pr.sale_id
    WHERE sa.id = ?
    ORDER BY sa_pr.sale_id, sa_pr.product_id`;
  
  const [response] = await connection.execute(query, [id]);

  return response;
};

const update = async (saleId, sales) => {
  const query = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE product_id = ? AND sale_id = ?`;

  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(query, [quantity, productId, saleId]);
  });

  return {
    saleId,
    itemsUpdated: sales,
  };
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [response] = await connection.execute(query, [id]);

  return response;
};

module.exports = { create, selectAll, selectById, update, remove };
