const saleController = require('../../../controllers/saleController');
const salesServices = require('../../../services/salesServices');

const sinon = require('sinon');
const { expect } = require('chai');

describe('Ao executar o saleController', () => {
  const sales = [
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
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];

  const createdOrUpdatedSale = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

  const req = {};
  const res = {};

  before(() => {
    req.params = { id: 2 }

    req.body = { };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, 'selectAll').returns(sales);
    sinon.stub(salesServices, 'selectById').returns(oneSale);
    sinon.stub(salesServices, 'create').returns(createdOrUpdatedSale);
    sinon.stub(salesServices, 'update').returns(createdOrUpdatedSale);
  });

  after(() => {
    salesServices.selectAll.restore();
    salesServices.selectById.restore();
  });

  describe('selectAll', () => {
    it('será retornado status 200', async () => {
      await saleController.selectAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);

    });
  
    it('será retornado um array com todas as vendas', async () => {
      await saleController.selectAll(req, res);
      expect(res.json.calledWith(sales)).to.be.equal(true);
    });
  });  

describe('selectById', () => {
    it('será retornado status 200', async () => {
      await saleController.selectById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);

    });
  
    it('será retornado uma venda com sucesso ', async () => {
      await saleController.selectById(req, res);
      expect(res.json.calledWith(sales)).to.be.equal(true);
    });
  });  

  describe('create', () => {
    it('será retornado status 201', async () => {
      await saleController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);

    });
  
    it('será retornado a venda criada', async () => {
      await saleController.create(req, res);
      expect(res.json.calledWith(createdOrUpdatedSale)).to.be.equal(true);
    });
  });  

  describe('update', () => {
    it('será retornado status 200', async () => {
      await saleController.update(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);

    });
  
    it('será retornado a venda atualizada', async () => {
      await saleController.update(req, res);
      expect(res.json.calledWith(createdOrUpdatedSale)).to.be.equal(true);
    });
  });  

  describe('remove', () => {
    before(() => {
      req.params = { id: 2 }

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(salesServices, 'remove').returns('');
    });

    it('será retornado status 204', async () => {
      await saleController.remove(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
    });

  });

});