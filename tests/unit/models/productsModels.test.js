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

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(2);
  });

  it('ter as propridades id e name', async () => {
    const response = await productModel.selectAll();

    expect(response[0]).to.have.a.property('name');
    expect(response[0]).to.have.a.property('id');
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

describe('Ao passar id e nome do produto para editar', () => { 

  describe('com informações inválidas', () => {
    const id = 999;
    const errorMessage = 'id inválido';
    const name = 'Traje de invisibilidade'

    before(() => {

      sinon.stub(connection, 'execute').resolves(false)
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
      sinon.stub(connection, 'execute').resolves(false)
    });

    after(() => {
      connection.execute.restore();
    });

    it('espero que retorne um erro', async () => {
      const productUpdated = await productModel.remove(id);

      expect(productUpdated).to.be.equal('id inválido');
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

// const { expect } = require('chai');
// const sinon = require('sinon');

// const connection = require('../../models/connection');

// const MoviesModel = require('../../models/movieModel');

// describe(('Inserir novo filme no BD'), () => {
//   const payloadMovie = {
//     title: 'Example Movie',
//     directedBy: 'Jane Dow',
//     releaseYear: 1999,
//   };

//   before(async () => {
//     const execute = [{ insertId: 1 }];

//     sinon.stub(connection, 'execute').resolves(execute); // a função 'execute', irá retornar o array com objeto que definimos
//   })

//   after(async () => {
//     // restaurar a função
//     connection.execute.restore();
//   })

//   describe('quando é inserido com sucesso', () => { 

//     it('retorna um objeto', async () => {
//       const response = await MoviesModel.create(payloadMovie);

//       expect(response).to.be.a('object')
//     });

//     it('tal objeto possui o "id" do novo filme inserido', async () => {
//       const response = await MoviesModel.create(payloadMovie);

//       expect(response).to.have.a.property('id');
      
//       expect(response.id).to.be.equal(1);
//     });

//   });
// });

// describe('Selecionar um filme pelo ID', () => {
//   const id = 1;

//   before(async () =>{
//     const execute = [{
//       title: 'Inception', 
//       directed_by: 'Christopher Nolan', 
//       release_year: 2010
//     }];

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });

//   describe('quando é passado o ID com sucesso', () => {
//     it('retorna um objeto', async () => {
//       const response = await MoviesModel.getById(id);

//       expect(response).to.be.a('object');
//     });

//     it('ter as propriedades title, directed_by, release_year com os valores corretos', async () => {
//       const response = await MoviesModel.getById(id);

//       expect(response).to.have.all.keys('title', 'directed_by', 'release_year');

//       expect(response.title).to.be.equal('Inception');
//       expect(response.directed_by).to.be.equal('Christopher Nolan');
//       expect(response.release_year).to.be.equal(2010);
//     });
//   });

// });
