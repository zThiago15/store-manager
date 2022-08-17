const { expect } = require("chai");
const sinon = require('sinon');

const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe('Ao executar o salesModel', () => {

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
  const salesDB = [
    {
      "sale_id": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "sale_id": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ]

  const oneSale = [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ];

  const salesToCreateOrUpdate = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

  const createdSales = {
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
  }

  const updatedSales = {
    "saleId": 1,
    "itemsUpdated": [
      {
        "productId": 1,
        "quantity":10
      },
      {
        "productId": 2,
        "quantity":50
      }
    ]
  }

  describe('create', () => {

    const inserted = { insertId: 3 };
    before(() => {
      sinon.stub(connection, 'execute').resolves([inserted]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('será retornado as vendas registradas', async () => {

      const salesCreated = await salesModel.create(sale, date);
      expect(salesCreated).to.be.deep.equal({ ...createdSales });
    });
  });

});

describe('ao listar todas as vendas', () => {

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