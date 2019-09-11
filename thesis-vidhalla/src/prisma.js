import { Prisma } from "prisma-binding";
import Comment from "./resolvers/Comment";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  secret: "pr!5m453cr37"
});

export default prisma;

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

const updateVideoForUser = async (videoId, data) => {
  const videoExists = await prisma.exists.Video({ id: videoId });

  if (!videoExists) throw new Error("Video not found");

  const video = await prisma.mutation.updateVideo(
    { where: { id: videoId }, data },
    "{ uploader {id email videos {id title url}"
  );

  return video.uploader;
};

//Definisemo fuknciju
const createVideoForUser = async (uploaderId, data) => {
  const uploaderExists = await prisma.exists.User({ id: uploaderId });

  if (!uploaderExists) throw new Error("User not found");

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
    "{ uploader { id email videos { title url } } }"
  );

  // const uploader = await prisma.query.user(
  //   { where: { id: uploaderId } },
  //   "{ id username videos { id url title } }"
  // );

  return video.author;
};

//Zatim pozivamo sa argumentima
// createVideoForUser({})
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(error => console.log(error));

// updateVideoForUser("chsadkdkaskd", {})
//   .then(uploader => console.log(JSON.stringify(uploader, undefined, 2)))
//   .catch(error => console.log(error.message));

// prisma.query.users(null, "{ id name videos { id title url} }");
