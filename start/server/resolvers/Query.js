const Query = {
  mainCards: () => mainCards,
  animals: (parent, args, { animals }) => animals,
  // Query for a specific animal
  animal: (_, { slug }, { animals }, ___) => {
    let animal = animals.find((animal) => {
      return animal.slug === slug;
    });
    return animal;
  },
  categories: (parent, args, { categories }) => categories,
  category: (_, { slug }, { categories }, ___) => {
    let category = categories.find((category) => {
      return category.slug === slug;
    });
    return category;
  },
};

module.exports = Query;
