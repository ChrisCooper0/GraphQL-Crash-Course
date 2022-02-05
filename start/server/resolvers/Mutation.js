const { v4 } = require("uuid");
const { animals } = require("../db");
const { animal } = require("./Query");
const Mutation = {
  addAnimal: (
    _,
    { image, title, rating, price, description, stock, onSale, slug, category },
    { animals }
  ) => {
    let newAnimal = {
      id: v4(),
      image,
      title,
      rating,
      price,
      description,
      stock,
      onSale,
      slug,
      category,
    };
    animals.push(newAnimal);
    return newAnimal;
  },
  removeAnimal: (_, { id }, { animals }) => {
    let index = animals.findIndex((animal) => {
      return animal.id === id;
    });
    animals.splice(index, 1);
    return true;
  },
};

module.exports = Mutation;
