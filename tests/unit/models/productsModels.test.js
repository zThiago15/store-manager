const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');

describe('Ao fazer chamada para listar todos os produtos', () => {

  before(() => {
    const products = [{
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    }];
    
    sinon.stub(connection, 'execute').resolves(products);

  })

  after(() => {
    connection.execute.restore();
  });

  it('será retornado um array com 2 elementos', async () => {
    const response = await productModel.selectAll();

    expect(response).to.be.an('object');
  });

  it('ter as propridades id e name', async () => {
    const response = await productModel.selectAll();

    expect(response).to.have.a.property('name');
    expect(response).to.have.a.property('id');
  });
});

describe('Ao criar produto', () => {
    before(() => {
    const products = [{ insertId: 1 }];
    
    sinon.stub(connection, 'execute').resolves(products);

  })

  after(() => {
    connection.execute.restore();
  });

  it('espero que retorna o insertId do produto', async () => {
    const productCreated = await productModel.create();

    expect(productCreated).to.have.property('insertId', 1);
  });

}); 

describe('Ao editar produto', () => { 

  describe('com informações inválidas', () => {
    const id = 999;
    const errorMessage = 'id inválido';
    const name = 'Traje de invisibilidade'

    before(() => {
      sinon.stub(connection, 'execute').resolves(errorMessage)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne um erro', async () => {
      const productUpdated = await productModel.update(id, name);

      expect(productUpdated).to.be.equal('id inválido');
    });
  });

describe('com informações válidas', () => {
    const id = 2;
    const name = 'Traje de invisibilidade'
    
    before(() => {

      sinon.stub(connection, 'execute').resolves(true)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne um erro', async () => {
      const productUpdated = await productModel.update(id, name);

      expect(productUpdated).to.be.equal(true);
    });
  });

}); 

describe('Ao excluir produto', () => { 

  describe('com id inválido', () => {
    const id = 1;
    const errorMessage = 'id inválido';
    
    before(() => {
      sinon.stub(connection, 'execute').resolves(errorMessage)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne um erro', async () => {
      const productUpdated = await productModel.remove(id);

      expect(productUpdated).to.be.equal(errorMessage);
    });
  });

  describe('com id válido', () => {
    const id = 1;

    before(() => {
      sinon.stub(connection, 'execute').resolves(true)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne true', async () => {
      const productUpdated = await productModel.remove(id);

      expect(productUpdated).to.be.equal(true);
    });
  });
});

describe('Ao buscar um produto por Id', () => { 

  describe('com id inválido', () => {
    const id = 1;
    const errorMessage = 'id inválido';
    
    before(() => {
      sinon.stub(connection, 'execute').resolves(errorMessage)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne um erro', async () => {
      const productUpdated = await productModel.getById(id);

      expect(productUpdated).to.be.equal(errorMessage);
    });
  });

  describe('com id válido', () => {
    const id = 1;

    before(() => {
      sinon.stub(connection, 'execute').resolves(true)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne true', async () => {
      const productUpdated = await productModel.getById(id);

      expect(productUpdated).to.be.equal(true);
    });
  });
});