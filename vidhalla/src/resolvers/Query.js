const Query = {
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
    users(parent, args, {
        db
    }, info) {
        if (args.query) {
            return db.users.filter(user =>
                user.username.toLowerCase().includes(args.query.toLowerCase())
            );
        }
        return [];
    },
    videos(parent, args, {
        db
    }, info) {
        if (!args.query) return db.videos;
        const query = args.query.toLowerCase();
        return db.videos.filter(video => {
            video.title.toLowerCase().includes(query);
        });
    },
    comments(parent, args, {
        db
    }, info) {
        if (!args.query) return db.comments;
        const query = args.query.toLowerCase();
        return db.comments.filter(comment =>
            comment.content.toLowerCase().includes(query)
        );
    }
}

export default Query;