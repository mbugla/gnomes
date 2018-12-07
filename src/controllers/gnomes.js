const repository = require('../repositories/gnomesInMemory');
const Gnome = require('../models/gnome');

async function getGnomes() {
  const result = await repository.getGnomes();

  return result;
}

async function addGnome(requestBody) {
  const gnome = Gnome.fromRequestBody(requestBody);
  await repository.addGnome(gnome);

  return gnome;
}

async function getGnomeById(gnomeId) {
  const gnome = await repository.getGnomeById(gnomeId);

  return gnome;
}

async function removeGnomeById(gnomeId) {
  await repository.removeGnomeById(gnomeId);
}

module.exports = {
  getGnomes,
  addGnome,
  getGnomeById,
  removeGnomeById,
};
