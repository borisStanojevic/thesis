const Query = {
import getUserId from './../utils/getUserId';
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
  users(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(operationArgs, info);
  },

  videos(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            description_contains: args.query
          }
        ]
      };
    }

    return prisma.query.videos(operationArgs, info);
  },

  video(parent, args, {prisma, request}, info){
    const userId = getUserId(request, false);

  },

  comments(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        content_contains: args.query
      };
    }

    return prisma.query.comments(operationArgs, info);
  }
};

export default Query;
