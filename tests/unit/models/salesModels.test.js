const { expect } = require("chai");
const sinon = require('sinon');

const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe('ao cadastrar uma venda', () => {

    const saleId = 1;
    const productId = 2;
    const quantity = 2;


  beforeEach(sinon.restore);
  describe('com dados inválidos', () => {
    const errorMessage = 'Dados inválidos';

    it('deverá retornar um erro', async () => {
      sinon.stub(connection, 'execute').resolves(false);

      const salesCreated = await salesModel.create(saleId, productId, quantity);

      expect(salesCreated).to.be.equal(errorMessage)
    });
  });

  describe('com dados válidos', () => {
    it('deverá retornar o insertId', async () => {
      const id = { insertId: 1 };

      sinon.stub(connection, 'execute').resolves(id);

      const salesCreated = await salesModel.create(saleId, productId, quantity);
      expect(salesCreated).to.be.equal(id);
    });
  })

});

describe('ao listar todas as vendas', () => {

  beforeEach(sinon.restore);
    it('deverá retorna um array', async () => {
      
      const sales = [{
        sale_id: 1,
        product_id: 2,
        quantity: 2
      }];

      sinon.stub(connection, 'execute').resolves(sales);

      const salesCreated = await salesModel.selectAll();
      expect(salesCreated).to.be.equal(sales);

      expect(salesCreated[0]).to.have.property('sale_id');
      expect(salesCreated[0]).to.have.property('product_id');
      expect(salesCreated[0]).to.have.property('quantity');
    });
});

