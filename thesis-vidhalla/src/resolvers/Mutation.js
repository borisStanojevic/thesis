import uuid from "uuid/v4";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) throw new Error("Email taken");

    const user = await prisma.mutation.createUser({ data: args.data }, info);

    return user;
  },

  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) throw new Error("User not found");

    const deletedUser = await prisma.mutation.deleteUser({
      where: { id: args.id }
    });

    return deletedUser;
  },

  async updateUser(parent, args, { prisma }, info) {
    const updatedUser = await prisma.mutation.updateUser({
      data: args.data,
      where: { id: args.id }
    });

    return updatedUser;
  },

  async createVideo(parent, args, { prisma }, info) {
    return prisma.mutation.createVideo(
      {
        data: {
          url: args.data.url,
          title: args.data.title,
          uploader: { connect: { id: args.data.uploader } }
        }
      },
      info
    );
  },

  async deleteVideo(parent, args, { prisma }, info) {
    return prisma.mutation.deleteVideo({ where: { id: args.id } });
  },

  async updateVideo(parent, args, { prisma }, info) {
    return prisma.mutation.updateVideo(
      { data: args.data, where: { id: args.id } },
      info
    );
  },

  async createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          content: args.data.content,
          author: { connect: { id: args.data.author } },
          video: { connect: { id: args.data.video } }
        }
      },
      info
    );
  },

  async updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    );
  },

  async deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};

export default Mutation;
