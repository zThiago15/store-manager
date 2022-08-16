const { expect } = require('chai');
const productController = require('../../../controllers/productController');
const productServices = require('../../../services/productsServices');

const sinon = require('sinon');

describe('Ao executar o productController', () => {

  const products = [ 
      {
    "id": 1,
    "name": "Martelo de Thor",
    },
      {
    "id": 2,
    "name": "Máscara do Batman",
    }
  ]
  
  const productCreated = {
    "id": 4,
    "name": "ProdutoX"
  };


  const req = {};
  const res = {};

  before(() => {
    req.body = {};
    req.params = { id: 1 };


    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    sinon.stub(productServices, 'selectAll').returns(products);
    sinon.stub(productServices, 'getById').returns(products[0]);
    sinon.stub(productServices, 'create').returns(productCreated);
    sinon.stub(productServices, 'update').returns(products[1]);
  });

  after(() => {
    productServices.selectAll.restore();
    productServices.getById.restore();
    productServices.create.restore();
    productServices.update.restore();
  });

  describe('selectAll', () => {
    it('será retornado status 200', async () => {
  
      await productController.selectAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    
    it('será retornado um array com todos os produtos', async () => {
      await productController.selectAll(req, res);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });
  });

  describe('getById', () => {
    it('será retornado status 200', async () => {
  
      await productController.selectById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    
    it('será retornado um produto com sucesso', async () => {
      await productController.selectById(req, res);
      expect(res.json.calledWith(products[0])).to.be.equal(true);
    });
  });

  describe('create', () => {
    it('será retornado status 201', async () => {
      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('será retornado o nome e id do produto criado', async () => {
      await productController.create(req, res);

      expect(res.json.calledWith(productCreated)).to.be.equal(true);
    });
  });

  describe('update', () => {
    it('será retornado status 200', async () => {
      await productController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('será retornado o nome e id do produto criado', async () => {
      await productController.update(req, res);

      expect(res.json.calledWith(products[1])).to.be.equal(true);
    });
  });

  describe('remove', () => {
    before(() => {

      sinon.stub(productServices, 'remove').resolves('');
      res.status = sinon.stub().returns(res); 
      res.end = sinon.stub().returns();

    });

    after(() => {
      productServices.remove.restore();
    });

    it('será retornado status 204', async () => {
      await productController.remove(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });

});