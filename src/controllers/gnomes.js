const repository = require('../repositories/gnomesInMemory');
const Gnome = require('../models/gnome');

async function getGnomes() {
  const result = await repository.getGnomes();

  return result;
}

async function updateGnome(gnomeId, requestBody) {
  const data = requestBody;
  data.id = gnomeId;
  const result = await repository.updateGnome(data);

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

async function updateAvatar(gnomeId, filename) {
  const gnome = await repository.updateGnome({ id: gnomeId, avatar: filename });

  return gnome;
}


module.exports = {
  getGnomes,
  addGnome,
  getGnomeById,
  removeGnomeById,
  updateAvatar,
  updateGnome,
};
