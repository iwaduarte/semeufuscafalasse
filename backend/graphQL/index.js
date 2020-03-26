module.exports = (app) => {
    const {ApolloServer, gql} = require('apollo-server-express');
    const {typeDefs, resolvers} = require('./schema');

    const server = new ApolloServer({
        cors: {
            origin: '*',
            credentials: true,
        },
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({app});

    return server.graphqlPath;
};

// app.listen({ port: 4000 }, () =>
//     console.log(`🚀 GraphQL ready at http://localhost:4000${server.graphqlPath}`)
// )