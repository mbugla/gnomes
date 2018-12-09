const { v4 } = require('uuid');

class Gnome {
  constructor(id, name, strength, age, avatar) {
    this.id = id;
    this.name = name;
    this.strength = strength;
    this.age = age;
    this.avatar = avatar;
  }

  static fromRequestBody(body) {
    return new this(v4(), body.name, body.strength, body.age, 'default.png');
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      strength: this.strength,
      age: this.age,
      avatar: this.avatar,
    };
  }
}

module.exports = Gnome;
