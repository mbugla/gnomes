const repository = require('../../src/repositories/gnomesInMemory');

const Gnome = require('../../src/models/gnome');

describe('Gnomes Repository', () => {
  it('allows to store gnome', async () => {
    const gnome = await repository.addGnome(new Gnome('123', 'UrukShak', 99, 20, 'uruk.png'));

    expect(gnome.toJSON()).toEqual({
      id: '123',
      name: 'UrukShak',
      strength: 99,
      age: 20,
      avatar: 'uruk.png',
    });
  });

  it('allows to retreive single gnome', async () => {
    await repository.addGnome(new Gnome('456', 'UrukShak', 99, 20, 'uruk.png'));
    const retreivedGnome = await repository.getGnomeById('123');
    expect(retreivedGnome.toJSON()).toEqual({
      id: '123',
      name: 'UrukShak',
      strength: 99,
      age: 20,
      avatar: 'uruk.png',
    });
  });

  it('is able to retreive all stored gnomes', async () => {
    const retreivedGnomes = await repository.getGnomes();
    expect(retreivedGnomes).toHaveLength(2);
  });

  it('allows to remove gnome', async () => {
    await repository.removeGnomeById('123');
    const retreivedGnomes = await repository.getGnomes();
    expect(retreivedGnomes).toHaveLength(1);
  });
});
