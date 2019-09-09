const User = {
    videos(parent, args, {
        db
    }, info) {
        return db.videos.filter(video => {
            video.uploader === parent.id;
        });
    },
    comments(parent, args, {
        db
    }, info) {
        return db.comments.filter(comment => comment.author === parent.id);
    }
}

export default User;