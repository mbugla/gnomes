jest.mock('uuid', () => ({
  v4: () => '1231-12da-31sa-31241',
}));

const Gnome = require('../../src/models/gnome');

describe('Gnome model', () => {
  it('creates post from request', () => {
    const requestBody = {
      name: 'Ukruk',
      strength: 12,
      age: 20,
      avatar: 'default.png',
    };

    expect(Gnome.fromRequestBody(requestBody).toJSON()).toEqual({
      id: '1231-12da-31sa-31241',
      name: 'Ukruk',
      strength: 12,
      age: 20,
      avatar: 'default.png',
    });
  });
});
