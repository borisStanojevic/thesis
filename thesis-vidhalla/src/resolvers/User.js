import getUserId from "./../utils/getUserId";

const User = {
  videos: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts(
        { where: { isBlocked: false, uploader: { id: parent.id } } },
        info
      );
    }
  },

  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const authenticatedUserId = getUserId(request, false);
      if (authenticatedUserId && authenticatedUserId === parent.id)
        return parent.email;
      else return null;
    }
  }
};

export default User;
