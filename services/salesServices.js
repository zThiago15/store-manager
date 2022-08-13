const salesModels = require('../models/salesModel');

const serialize = (sale) => {
  if (sale[0].sale_id) {
    return sale.map(({ sale_id: saleId, date, product_id: productId, quantity }) => ({ 
      saleId,
      date,
      productId,
      quantity,
     }));
  }

  return sale.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
  }));
};

const selectAll = async () => {
  const sales = serialize(await salesModels.selectAll());

  return sales;
};

const selectById = async (id) => {
  const sale = serialize(await salesModels.selectById(id));

  return sale;
};

module.exports = { selectAll, selectById };