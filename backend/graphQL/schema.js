const {gql} = require("apollo-server-express");
const models = require("../database/");

//simple schema without domain separation
const typeDefs = gql`
    type Query {
        users: [User]
        user(id:ID!): User
        leaderboards: [Leaderboard]
        leaderboard(id:ID!): Leaderboard
        helloWorld: String!
    }
    type Mutation {
        savePoints(points: String!, name:String!, email:String!): Leaderboard!

    }
    type User {
        id: ID!
        name: String!
        email: String!
        leaderboard: [Leaderboard]
    }
    type Leaderboard {
        id: ID!
        points:String!
        user_id: Int
        user: User
    }
`;
const resolvers = {
        Query: {
            helloWorld: () => "Hello World",
            users: async () => await models.user.findAll(),
            user: async (obj, args) => await models.user.findByPk(args.id),
            leaderboards: async () => await models.leaderboard.findAll({order:[['points','DESC']]}),
            leaderboard: async (obj, args) => await models.leaderboard.findByPk(args.id),

        },
        Leaderboard: {
            user: async (obj, args, context, info) => {

                return models.user.findByPk(obj.userId);
            },

        },
        User: {
            leaderboard: async (obj, args) => models.leaderboard.findAll({where: {userId: obj.id}})

        },
        Mutation: {
            savePoints: async (_, {points, name, email}) => {
                const [user, created] = await models.user.findOrCreate({
                    where: {name, email}
                });
                return  models.leaderboard.create({points, userId: user.id});

            }
        }

    }
;


module.exports = {typeDefs, resolvers};