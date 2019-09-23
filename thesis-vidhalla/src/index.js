import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolvers/index";
import prisma from "./prisma";

// Type definitions that represents schema
// 5 scalar types: String, Boolean, Int, Float, ID store single-simple-non-further-breakable-down value

// Resolvers that represent functions that run for each operation on our API
// 4  arguments that are passed to resolver functions are:
// parent
// args - Contains all of the argument values provided
// {db}
// info

const pubsup = new PubSub();

//Define and run GraphQL server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      db,
      pubsup,
      prisma
    };
  },
  fragmentReplacements
});

server.start(() => {
  console.log("Server running...");
});
