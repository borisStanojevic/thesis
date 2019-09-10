import { GraphQLServer, PubSub } from "graphql-yoga";
import uuid from "uuid/v4";
import db from "./db";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import Mutation from "./resolvers/Mutation";
import Video from "./resolvers/Video";
import Comment from "./resolvers/Comment";
import prisma from "./prisma";

// Type definitions that represents schema
// 5 scalar types: String, Boolean, Int, Float, ID store single-simple-non-further-breakable-down value

// Resolvers that represent functions that run for each operation on our API
// 4  arguments that are passed to resolver functions are:
// parent
// args - Contains all of the argument values provided
// {db}
// info
const resolvers = {
  Query,
  Mutation,
  User,
  Video,
  Comment
};

const pubsup = new PubSub();

//Define and run GraphQL server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsup,
    prisma
  }
});
server.start(() => {
  console.log("Server running...");
});
