import getUserId from "./../utils/getUserId";

const Query = {
  greeting(parent, args, ctx, info) {
    if (args.name) return `Hello ${args.name}`;
    return "Hello unnamed one ;)";
  },

  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },

  myVideos(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const operationArgs = {
      where: {
        id: userId
      }
    };

    if (args.query) {
      operationArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          description_contains: args.query
        }
      ];
    }

    return prisma.query.videos(operationArgs, info);
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
    const operationArgs = {
      where: {
        isBlocked: false
      }
    };
    if (args.query) {
      operationArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          description_contains: args.query
        }
      ];
    }

    return prisma.query.videos(operationArgs, info);
  },

  async video(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const videos = await prisma.query.vidoes(
      {
        where: {
          id: args.id,
          OR: [{ isBlocked: false }, { uploader: { id: userId } }]
        }
      },
      info
    );

    if (videos.length === 0) throw new Error("Post not found");
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
