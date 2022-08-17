const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');

describe('Ao executar o productModel', () => {
    const products = [{
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    }];

  describe('selectAll', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([products]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('será retornado os produtos em um array com 2 elementos', async () => {
      const response = await productModel.selectAll();

      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(2);
    });

    it('o primeiro elemento ter as propridades id e name', async () => {
      const response = await productModel.selectAll();

      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('id');
    });
  });

  describe('create', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([products[0]]);
    })

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorna o id e nome do produto criado', async () => {
      const productCreated = await productModel.create();

      expect(productCreated).to.have.property('id');
      expect(productCreated).to.have.property('name');
      expect(productCreated).to.be.deep.equal(products[0]);
    });

  }); 

  describe('update', () => { 

    before(() => {
      sinon.stub(connection, 'execute').resolves([products[1]])
    });

    after(() => {
      connection.execute.restore();
    });

    it('produto será atualizado', async () => {
      const id = 2;
      const name = 'Traje de encolhimento';

      const productUpdated = await productModel.update(id, name);

      expect(productUpdated).to.be.equal(products[1]);
    });
  });

  describe('remove', () => {
    const id = 1;

    before(() => {
      sinon.stub(connection, 'execute').resolves(true);
    });true

    after(() => {
      connection.execute.restore();
    });

    it('o produto será removido', async () => {
      const productUpdated = await productModel.remove(id);

      expect(productUpdated).to.be.equal(true);
    });
  });

  describe('getById', () => {
    const id = 1;
    
    before(() => {
      sinon.stub(connection, 'execute').resolves([[products[0]]])
    });

    after(() => {
      connection.execute.restore();
    });

    it('será retornado o produto buscado por Id', async () => {
      const productUpdated = await productModel.getById(id);

      expect(productUpdated).to.be.equal(products[0]);
    });
  });

  describe('search', () => {    
    before(() => {
      sinon.stub(connection, 'execute').resolves([products[0]])
    });

    after(() => {
      connection.execute.restore();
    });

    it('será retornado o produto buscado pelo termo', async () => {
      const productUpdated = await productModel.search('martelo');

      expect(productUpdated).to.be.equal(products[0]);
    });
  });
});
