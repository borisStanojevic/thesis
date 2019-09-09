import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

//prisma.query prisma.mutation prisma.subscription prisma.exists
//dva argumenta : operation arguments i selection set
prisma.query.users(null, "{ id name videos { id title url} }").then(data => {
  console.log(JSON.stringify(data, undefined, 2));
});
