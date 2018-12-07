jest.mock('uuid', () => ({
  v4: () => '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
}));

const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('creates gnomes', (done) => {
    request(app)
      .post('/gnomes')
      .send({
        name: 'RukShak',
        strength: 100,
        age: 20,
        avatar: 'default.png',
      })
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome created',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'RukShak',
            strength: 100,
            age: 20,
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('update gnome all field', (done) => {
    request(app)
      .put('/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        name: 'RukShakur',
        strength: 100,
        age: 21,
        avatar: 'shakur.jpg',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome updated',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'RukShakur',
            strength: 100,
            age: 21,
            avatar: 'shakur.jpg',
          },
        });
        done();
      });
  });

  it('update gnome name', (done) => {
    request(app)
      .put('/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        name: 'ZeRok',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome updated',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 100,
            age: 21,
            avatar: 'shakur.jpg',
          },
        });
        done();
      });
  });

  it('update gnome strength', (done) => {
    request(app)
      .put('/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        strength: 30,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome updated',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 30,
            age: 21,
            avatar: 'shakur.jpg',
          },
        });
        done();
      });
  });

  it('update gnome age', (done) => {
    request(app)
      .put('/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        age: 30,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome updated',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 30,
            age: 30,
            avatar: 'shakur.jpg',
          },
        });
        done();
      });
  });

  it('update gnome avatar', (done) => {
    request(app)
      .put('/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        avatar: 'zerok.jpg',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Gnome updated',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 30,
            age: 30,
            avatar: 'zerok.jpg',
          },
        });
        done();
      });
  });

  it('return error on update non existing gnome', (done) => {
    request(app)
      .put('/gnomes/non-existing-id')
      .send({
        strength: 30,
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body).toEqual({
          error: 'Missing gnome with id: non-existing-id',
        });
        done();
      });
  });
});