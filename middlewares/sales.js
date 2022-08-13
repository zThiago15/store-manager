const salesModel = require('../models/salesModel');

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;

  const saleExists = await salesModel.selectById(id);
  if (saleExists.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

module.exports = { validateSaleId };