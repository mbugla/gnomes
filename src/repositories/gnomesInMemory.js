const { ApiError } = require('../exceptions/api');

let gnomes = [];

async function addGnome(post) {
  gnomes.push(post);

  return post;
}

async function updateGnome(gnomeData) {
  if (!gnomeData.id) {
    throw new ApiError('Missing gnome id', 400);
  }

  const gnomeId = gnomeData.id;
  const storedGnome = gnomes.find(gnomeObj => gnomeId === gnomeObj.id);

  if (!storedGnome) {
    throw new ApiError(`Missing gnome with id: ${gnomeId}`, 404);
  }

  storedGnome.name = gnomeData.name ? gnomeData.name : storedGnome.name;
  storedGnome.strength = gnomeData.strength ? gnomeData.strength : storedGnome.strength;
  storedGnome.age = gnomeData.age ? gnomeData.age : storedGnome.age;
  storedGnome.avatar = gnomeData.avatar ? gnomeData.avatar : storedGnome.avatar;

  return storedGnome;
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
  updateGnome,
};
