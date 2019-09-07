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
];

const videos = [];

const comments = [];

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
        isBlocked: Boolean
        isDeleted: Boolean
        role: Role
        subscribers: [User!]!
    }

    enum Role {
        ADMIN
        REGULAR_USER
    }

    type Video {
        id: ID!
        url: String!
        description: String
        visibility: Visibility!
        isCommentingAllowed: Boolean!
        isRatingVisible: Boolean!
        isBlocked: Boolean
        views: Int!
        uploader: User!
    }

    enum Visibility {
        PUBLIC
        UNLISTED
        PRIVATE
    }

    type Comment {
        id: ID!
        content: String!
        author: User!
        video: Video!
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
                return users.filter(user =>
                    user.username.toLowerCase().includes(args.query.toLowerCase())
                );
            }
            return [];
        },
        videos(parent, args, ctx, info) {
            if (!args.query) return videos;
            const query = args.query.toLowerCase();
            return videos.filter(video => {
                video.title.toLowerCase().includes(query);
            });
        },
        comments(parent, args, ctx, info) {
            if (!args.query) return comments;
            const query = args.query.toLowerCase();
            return comments.filter(comment => comment.content.toLowerCase().includes(query));
        }
    },

    User: {
        videos(parent, args, ctx, info) {
            return videos.filter(video => {
                video.uploader === parent.id;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        }
    },

    Video: {
        uploader(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.uploader;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.video === parent.id);
        }
    },

    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        video(parent, args, ctx, info) {
            return videos.find(video => video.id === parent.video);
        }
    }
};

//Define and run GraphQL server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => {
    console.log("Server running...");
});