import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

//prisma.query prisma.mutation prisma.subscription prisma.exists
//dva argumenta : operation arguments i selection set
// prisma.query.users(null, "{ id name videos { id title url} }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createUser(
//     {
//       data: { username: "pera123", email: "pera@email.com" }
//     },
//     "{ id username }"
//   )
//   .then(data => {
//     console.log(data, undefined, 2);
//   });

//Definisemo fuknciju
const createVideoForUser = async (uploaderId, data) => {
  const video = await prisma.mutation.createVideo(
    {
      data: {
        ...data,
        uploader: {
          connect: {
            id: uploaderId
          }
        }
      }
    },
    "{ id }"
  );

  const uploader = await prisma.query.user(
    { where: { id: uploaderId } },
    "{ id username videos { id url title } }"
  );

  return uploader;
};

//Zatim pozivamo sa argumentima
// createVideoForUser(...).then(user => console.log(JSON.stringify(user, undefined, 2)))
prisma.query.users(null, "{ id name videos { id title url} }");


