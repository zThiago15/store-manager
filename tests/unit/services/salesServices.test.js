const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');

describe('Ao executar o sale service', () => {
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

  const salesSerialized = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
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

  const oneSaleSerialized = [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
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
        "quantity":1
      },
      {
        "productId": 2,
        "quantity":5
      }
    ]
  }

  before(() => {
    sinon.stub(salesModel, 'selectAll').resolves(salesDB);
    sinon.stub(salesModel, 'selectById').resolves(oneSale);
    sinon.stub(salesModel, 'create').resolves(createdSales);
    sinon.stub(salesModel, 'update').resolves(updatedSales);
    sinon.stub(salesModel, 'remove').resolves(true);
  });
  
  after(() => {
    salesModel.selectAll.restore();
    salesModel.selectById.restore();
    salesModel.create.restore();
    salesModel.update.restore();
    salesModel.remove.restore();
  })

  describe('selectAll', () => {
    it('será retornado todas as vendas', async () => {
      const response = await salesServices.selectAll();

      expect(response).to.be.deep.equal(salesSerialized);
    })
  });

  describe('getById', () => {
    const id = 1;
    it('será retornado a venda com o Id requisitado', async () => {
      const response = await salesServices.selectById(id);

      expect(response).to.be.deep.equal(oneSaleSerialized);
    })
  });

  describe('create', () => {

    it('será retornado a venda criada', async () => {
      const response = await salesServices.create(salesToCreateOrUpdate);

      expect(response).to.be.deep.equal(createdSales);
    });
  });

  describe('update', () => {
    it('será retornado a venda atualizada', async () => {
      const id = 2;

      const response = await salesServices.update(id, salesToCreateOrUpdate);
      

      expect(response).to.be.deep.equal(updatedSales);
    })
  });

  describe('remove', () => {
    const id = 1;
    it('a venda será deletada', async () => {

      const response = await salesServices.remove(id);

      expect(response).to.be.equal(true);
    })
  });
});