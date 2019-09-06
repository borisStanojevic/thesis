import {
    GraphQLServer
} from "graphql-yoga";

const users = [{
        id: "123",
        username: "mitar123",
        email: "mitar123@grand.rs",
        firstName: "Mitar",
        lastName: "Miric",
        channelDescription: "No description yet.",
        isBlocked: false

    },
    {
        id: "124",
        username: "jovan123",
        email: "jovan123@grand.rs",
        firstName: "Jovan",
        lastName: "Jovanovic",
        channelDescription: "No description yet.",
        isBlocked: false
    },
    {
        id: "125",
        username: "pera123",
        email: "pera123@grand.rs",
        firstName: "Pera",
        lastName: "Peric",
        channelDescription: "No description yet.",
        isBlocked: false
    }
]
// Type definitions that represents schema
// 5 scalar types: String, Boolean, Int, Float, ID store single-simple-non-further-breakable-down value
const typeDefs = `
    type Query {
        greeting(name: String): String!
        me: User!
        users(query: String): [User!]!
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String
        lastName: String
        channelDescription: String
        isBlocked: Boolean!
        isDeleted: Boolean
    }
`;
// Resolvers that represent functions that run for each operation on our API
// 4  arguments that are passed to resolver functions are:
// parent
// args - Contains all of the argument values provided
// ctx 
// info 
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name) return `Hello ${args.name}`;
            return "Hello unnamed one ;)";
        },
        me() {
            return {
                id: "123",
                username: "mitar123",
                email: "mitar123@grand.rs",
                firstName: "Mitar",
                lastName: "Miric",
                channelDescription: "No description yet."
            };
        },
        users(parent, args, ctx, info) {
            if (args.query) {
                return users.filter(user => user.username.toLowerCase().includes(args.query.toLowerCase()));
            }
            return [];
        }
    }
};

//Define and run GraphQL server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => {
    console.log("Server running...")
});