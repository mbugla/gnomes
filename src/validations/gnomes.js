const Joi = require('joi');

const name = Joi.string();
const strength = Joi.number().integer().min(0).max(100);
const age = Joi.number().integer().min(0).max(100);

const createGnomeSchema = Joi.object().keys({
  name: name.required(),
  strength: strength.required(),
  age: age.required(),
});

const updateGnomeSchema = Joi.object().keys({
  name,
  strength,
  age,
});

module.exports = {
  createGnomeSchema,
  updateGnomeSchema,
};
