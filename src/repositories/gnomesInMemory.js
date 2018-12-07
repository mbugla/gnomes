const { ApiError } = require('../exceptions/api');

let gnomes = [];

async function addGnome(post) {
  gnomes.push(post);

  return post;
}

async function getGnomeById(gnomeId) {
  const storedGnome = gnomes.find(gnome => gnome.id === gnomeId);

  if (!storedGnome) {
    throw new ApiError(`Missing gnome with id: ${gnomeId}`, 404);
  }

  return storedGnome;
}

async function removeGnomeById(gnomeId) {
  const gnomeIndex = gnomes.findIndex(gnome => gnome.id === gnomeId);

  if (gnomeIndex < 0) {
    throw new ApiError(`Missing gnome with id: ${gnomeId}`, 404);
  }

  gnomes = gnomes.filter(gnome => gnome.id !== gnomeId);
}

async function getGnomes() {
  return gnomes;
}

module.exports = {
  getGnomeById,
  getGnomes,
  addGnome,
  removeGnomeById,
};
