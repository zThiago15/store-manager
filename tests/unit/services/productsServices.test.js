const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

describe('Ao executar o product service', () => {
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

  const objId = { insertId: 1 };

  before(() => {
    sinon.stub(productModel, 'selectAll').returns(products);
    sinon.stub(productModel, 'getById').returns(products[0]);
    sinon.stub(productModel, 'create').returns(objId);
    sinon.stub(productModel, 'update').returns(true);
    sinon.stub(productModel, 'remove').returns(true);
  });
  
  after(() => {
    productModel.selectAll.restore();
    productModel.getById.restore();
    productModel.create.restore();
    productModel.update.restore();
    productModel.remove.restore();
  });

  describe('selectAll', () => {
    it('será retornado todos os produtos', async () => {
      const response = await productsServices.selectAll();

      expect(response).to.be.deep.equal(products);
    });
  });

  describe('getById', () => {
    const id = 1;
    it('será retornado o produto com o Id requisitado', async () => {
      const response = await productsServices.getById(id);

      expect(response).to.be.equal(products[0]);
    })
  });

  describe('create', () => {
    it('será retornado o produto criado com seu id e nome', async () => {
      const name = 'Martelo de Thor';
      const response = await productsServices.create(name);

      expect(response).to.be.deep.equal({ id: objId.insertId, name });
    })
  });

  describe('update', () => {
    it('será retornado o produto atualizado com o id e nome', async () => {
      const id = 2;
      const name = 'Máscara do Batman';
      const response = await productsServices.update(id, name);

      expect(response).to.be.deep.equal({ id, name });
    });
  });

  describe('remove', () => {
    const id = 1;
    it('o produto será deletado', async () => {

      const response = await productsServices.remove(id);

      expect(response).to.be.equal(true);
    })
  });

  describe('search', () => {
    describe('ao não encontrar nenhum resultado', () => {

      before(() => {
        sinon.stub(productModel, 'search').resolves([]);
      });

      after(() => {
        productModel.search.restore();
      })

      it('será retornado todos os produtos', async () => {
        const name = 'Camiseta';
        const response = await productsServices.search(name);
        expect(response).to.be.deep.equal(products);
      });
    });

    describe('ao encontrar resultados de busca', () => {
      before(() => {
        sinon.stub(productModel, 'search').resolves(products);
      });

      after(() => {
        productModel.search.restore();
      });

      it('os produtos encontrados serão retornados', async () => {
        const name = 'a';
        const response = await productsServices.search(name);
        expect(response).to.be.deep.equal(products);
      });
    });

  });

});