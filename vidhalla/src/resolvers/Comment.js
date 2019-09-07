const Comment = {
    author(parent, args, {
        db
    }, info) {
        return db.users.find(user => user.id === parent.author);
    },
    video(parent, args, {
        db
    }, info) {
        return db.videos.find(video => video.id === parent.video);
    }
}

export default Comment;