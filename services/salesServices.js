const salesModels = require('../models/salesModel');

function newDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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

const create = async (sale) => {
  const date = newDate();
  const createdSale = await salesModels.create(sale, date);

  return createdSale;
};

const update = async (id, sale) => {
  const updatedSale = await salesModels.update(id, sale);

  return updatedSale;
};

const remove = async (id) => {
  const saleRemoved = await salesModels.remove(id);

  return saleRemoved;
};

module.exports = { selectAll, selectById, create, update, remove };