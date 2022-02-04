const { ApolloServer, gql } = require("apollo-server");
const { mainCards, animals } = require("./db");

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
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal!]
    animal(slug: String!): Animal
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
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
