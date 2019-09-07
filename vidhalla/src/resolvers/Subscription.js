const Subscription = {
    comment: {
        subscribe(parent, {
            videoId
        }, {
            db,
            pubsub
        }, info) {
            const video = db.videos.find(video => video.id === videoId);

            if (!video)
                throw new Error("Video not found.");

            return pubsub.asyncIterator(`comment ${videoId}`);
        }
    }
}

export default Subscription;