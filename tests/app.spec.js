jest.mock('uuid', () => ({
  v4: () => '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
}));

const request = require('supertest');
const app = require('../src/app');

afterAll(() => setTimeout(() => process.exit(), 1000));

describe('App', () => {
  it('creates gnomes', (done) => {
    request(app)
      .post('/api/v1/gnomes')
      .send({
        name: 'RukShak',
        strength: 100,
        age: 20,
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

  it('return validation errors on invalid strength value', (done) => {
    request(app)
      .post('/api/v1/gnomes')
      .send({
        name: 'RukShak',
        strength: 101,
        age: 20,
      })
      .expect(400)
      .end(() => {
        expect.anything();
        done();
      });
  });

  it('return validation errors on invalid age value', (done) => {
    request(app)
      .post('/api/v1/gnomes')
      .send({
        name: 'RukShak',
        strength: 100,
        age: 1002,
      })
      .expect(400)
      .end(() => {
        expect.anything();
        done();
      });
  });

  it('return validation errors on try to modify avatar', (done) => {
    request(app)
      .post('/api/v1/gnomes')
      .send({
        name: 'RukShak',
        strength: 100,
        age: 100,
        avatar: 'avatar.png',
      })
      .expect(400)
      .end(() => {
        expect.anything();
        done();
      });
  });

  it('update gnome all field', (done) => {
    request(app)
      .put('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .send({
        name: 'RukShakur',
        strength: 100,
        age: 21,
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
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('update gnome name', (done) => {
    request(app)
      .put('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
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
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('update gnome strength', (done) => {
    request(app)
      .put('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
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
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('update gnome age', (done) => {
    request(app)
      .put('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
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
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('return error on update non existing gnome', (done) => {
    request(app)
      .put('/api/v1/gnomes/non-existing-id')
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

  it('gets gnome', (done) => {
    request(app)
      .get('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 30,
            age: 30,
            avatar: 'default.png',
          },
        });
        done();
      });
  });

  it('gets gnomes', (done) => {
    request(app)
      .get('/api/v1/gnomes')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: [{
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            name: 'ZeRok',
            strength: 30,
            age: 30,
            avatar: 'default.png',
          }],
        });
        done();
      });
  });

  it('returns error on non existent gnome', (done) => {
    request(app)
      .get('/api/v1/gnomes/non-existing-id')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          error: 'Missing gnome with id: non-existing-id',
        });
        done();
      });
  });

  it('remove post', (done) => {
    const server = request(app);
    server
      .delete('/api/v1/gnomes/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .expect(204)
      .end(() => {
        server
          .get('/api/v1/gnomes')
          .end((err, res) => {
            expect(res.body.payload).toHaveLength(0);
            done();
          });
      });
  });

  it('returns 404 when try to delete not existing gnome', (done) => {
    request(app)
      .delete('/api/v1/gnomes/not-existing-id')
      .expect(404)
      .end((err, res) => {
        expect(res.body).toEqual({
          error: 'Missing gnome with id: not-existing-id',
        });
        done();
      });
  });
});
