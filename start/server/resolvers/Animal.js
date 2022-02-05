const Animal = {
  category: (parent, _, { categories }) => {
    return categories.find((category) => {
      return category.id === parent.category;
    });
  },
};

module.exports = Animal;
