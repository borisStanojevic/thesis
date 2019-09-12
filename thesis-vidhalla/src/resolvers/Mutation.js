import getUserId from "./../utils/getUserId";
import generateJwt from "../utils/generateJWT";
import hashPassword from "./../utils/hashPassword";

// const token = jwt.sign({ id: 99 }, "secret");
// const decoded = jwt.decode(token); // Decoded payload
// jwt.verify(token, secret);

const Mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.users({
      where: {
        email: args.data.email
      }
    });

    if (!user) throw new Error("Invalid email");

    const passwordMatches = await bcrypt.compare(
      args.data.password,
      user.password
    );

    if (!passwordMatches) throw new Error("Invalid password");

    return { user, token: generateJwt(user.id) };
  },

  async createUser(parent, args, { prisma }, info) {
    //Take in password > validate password > hash password > generate auth token(JWT)
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) throw new Error("Email taken");

    const hashedPassword = hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: { ...args.data, password: hashedPassword }
    });

    return { user, token: generateJwt(user.id) };
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getuserId(request);
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) throw new Error("User not found");

    const deletedUser = await prisma.mutation.deleteUser({
      where: { id: userId }
    });

    return deletedUser;
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string")
      args.data.password = await hashPassword(args.data.password);

    const updatedUser = await prisma.mutation.updateUser({
      where: { id: userId },
      data: args.data
    });

    return updatedUser;
  },

  async createVideo(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createVideo(
      {
        data: {
          url: args.data.url,
          title: args.data.title,
          uploader: { connect: { id: userId } }
        }
      },
      info
    );
  },

  async deleteVideo(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    //Ako je autentikovan korisnik vlasnik videa koji se brise onda
    const videoExists = await prisma.exists.Video({
      id: args.id,
      uploader: { id: userId }
    });

    if (!videoExists) throw new Error("Unable to delete video");

    return prisma.mutation.deleteVideo({ where: { id: args.id } });
  },

  async updateVideo(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const videoExists = await prisma.exists.Video({
      id: args.id,
      uploader: {
        id: userId
      }
    });

    if (!videoExists) throw new Error("Unable to update video");

    return prisma.mutation.updateVideo(
      { data: args.data, where: { id: args.id } },
      info
    );
  },

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const videoExists = await prisma.exists.Video({
      id: args.data.video,
      isBlocked: false
    });

    if (!videoExists) throw new Error("Unable to find video");

    return prisma.mutation.createComment(
      {
        data: {
          content: args.data.content,
          author: { connect: { id: userId } },
          video: { connect: { id: args.data.video } }
        }
      },
      info
    );
  },

  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("Unable to update comment");

    return prisma.mutation.updateComment(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    );
  },

  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("Unable to delete comment");

    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};

export default Mutation;
