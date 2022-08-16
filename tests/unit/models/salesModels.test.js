const { expect } = require("chai");
const sinon = require('sinon');

const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe('ao cadastrar uma venda', () => {

  const sale = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];
  const date = '01/01/2001 12:00:00';

  const responses =   {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity":1
      },
      {
        "productId": 2,
        "quantity":5
      }
    ]
  };


  beforeEach(sinon.restore);
  describe('com dados válidos', () => {
    it('deverá retornar o insertId', async () => {
      const id = { insertId: 3 };

      sinon.stub(connection, 'execute').resolves([id]);

      const salesCreated = await salesModel.create(sale, date);
      expect(salesCreated).to.be.equal(responses);
    });
  });

});

// describe('ao listar todas as vendas', () => {

//   beforeEach(sinon.restore);
//     it('deverá retorna um array', async () => {
      
//       const sales = [{
//         sale_id: 1,
//         product_id: 2,
//         quantity: 2
//       }];

//       sinon.stub(connection, 'execute').resolves(sales);

//       const salesCreated = await salesModel.selectAll();
//       expect(salesCreated).to.be.equal(sales);

//       expect(salesCreated[0]).to.have.property('sale_id');
//       expect(salesCreated[0]).to.have.property('product_id');
//       expect(salesCreated[0]).to.have.property('quantity');
//     });
// });

