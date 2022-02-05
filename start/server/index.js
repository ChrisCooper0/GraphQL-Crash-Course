const { ApolloServer, gql } = require("apollo-server");
const { mainCards, animals, categories } = require("./db");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type MainCard {
    id: ID!
    title: String!
    image: String!
  }

  type Animal {
    id: ID!
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]!
    stock: Int!
    onSale: Boolean
    slug: String!
    category: Category
  }

  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal!]!
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
    // Query for a specific animal
    animal: (_, { slug }, __, ___) => {
      let animal = animals.find((animal) => {
        return animal.slug === slug;
      });
      return animal;
    },
    categories: () => categories,
    category: (_, { slug }, __, ___) => {
      let category = categories.find((category) => {
        return category.slug === slug;
      });
      return category;
    },
  },
  Category: {
    animals: (parent, _, __) => {
      return animals.filter((animal) => {
        return animal.category === parent.id;
      });
    },
  },
  Animal: {
    category: (parent, _, __) => {
      return categories.find((category) => {
        return category.id === parent.category;
      });
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
