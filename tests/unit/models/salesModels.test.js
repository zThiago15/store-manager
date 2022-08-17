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
  const sales = [
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

  const salesToUpdate = [
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

  describe('selectAll', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([sales]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('deverá retorna um array com todos as vendas', async () => {

        const salesSelected = await salesModel.selectAll();
        expect(salesSelected).to.be.equal(sales);

        expect(salesSelected[0]).to.have.property('sale_id');
        expect(salesSelected[0]).to.have.property('product_id');
        expect(salesSelected[0]).to.have.property('quantity');
      });
  });

  describe('selectById', () => {

    describe('será retornado a venda do id especificado', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([oneSale]);
        });
    
        after(() => {
          connection.execute.restore();
        });

      it('deverá retornar uma venda específica', async () => {
        const id = 1;
        const oneSaleSelected = await salesModel.selectById(id);
  
        expect(oneSaleSelected).to.be.equal(oneSale);
      });

    });



  });

  describe('update', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(true);
    });

    after(() => {
      connection.execute.restore();
    });

    it('deverá retornar a venda atualizada', async () => {
      const id = 1;
      const updatedSale = await salesModel.update(id, salesToUpdate);

      expect(updatedSale).to.be.deep.equal({ saleId: id, itemsUpdated: salesToUpdate });
    });
  });
  
  describe('remove',  () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([true]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('deverá deletar uma venda', async () => {
      const id = 1;
      const removedSale = await salesModel.remove(id);

      expect(removedSale).to.be.equal(true);
    });
  });

});

