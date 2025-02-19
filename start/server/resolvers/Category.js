const Category = {
  animals: (parent, _, { animals }) => {
    return animals.filter((animal) => {
      return animal.category === parent.id;
    });
  },
};

module.exports = Category;
