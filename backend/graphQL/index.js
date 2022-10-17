const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

const GQLServer = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  typeDefs,
  resolvers,
});

module.exports = { GQLServer };
