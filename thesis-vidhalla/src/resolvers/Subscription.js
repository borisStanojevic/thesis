const Subscription = {
  comment: {
    subscribe(parent, { videoId }, { pubsub }, info) {
      //Prisma -> Node -> Client (GraphQL Playground)
      return prisma.subscription.comment(
        { where: { node: { video: { id: videoId } } } },
        info
      );
      // const video = db.videos.find(video => video.id === videoId);
      // if (!video)
      //     throw new Error("Video not found.");
      // return pubsub.asyncIterator(`comment ${videoId}`);
    }
  }
};

export default Subscription;
