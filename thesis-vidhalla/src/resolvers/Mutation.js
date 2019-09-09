import uuid from 'uuid/v4';

const Mutation = {
    createUser(parent, args, {
        db

    }, info) {
        const isEmailTaken = db.users.some(user => user.email === args.data.email);
        if (isEmailTaken)
            throw new Error("Email already taken.");

        // const one = {
        //     name: "BA"
        // };

        // const two = {
        //     populaton: 3000000,
        //     ...one
        // };

        const user = {
            id: uuid(),
            ...args.data,
            firstName: "",
            lastName: "",
            channelDescription: "No description yet.",
            isBlocked: false,
            isDeleted: false,
            subscribers: []
        }
        db.users.push(user);

        return user;
    },

    deleteUser(parent, args, {
        db
    }, info) {
        const userIndex = db.users.findIndex(user => user.id === args.id);
        if (userIndex === -1)
            throw new Error("User does not exist.");

        const deletedUsers = db.users.splice(userIndex, 1);

        db.videos = db.videos.filter(video => {
            const match = video.uploader === args.id;
            if (match)
                db.comments = db.comments.filter(comment => comment.video != video.id);
            return !match;
        });
        db.comments = db.comments.filter(comment => comment.author != args.id);

        return deletedUsers[0];

    },

    updateUser(parent, args, {
        db
    }, info) {
        const {
            id,
            data
        } = args;
        const user = db.users.find(user => user.id === id);
        if (!user)
            throw new Error("User not found.");
        if (typeof data.email === "string") {
            const isEmailTaken = db.users.some(user => user.email === data.email);

            if (isEmailTaken)
                throw new Error("Email taken ");

            user.email = data.email;
        }
        if (typeof data.firstName === "string")
            user.firstName = data.firstName;

        if (typeof data.role !== "undefined")
            user.role = data.role;

        return user;

    },

    // createVideo(parent, args, {db}, info) {
    //     const uploaderExists = db.users.some(user => user.id === args.uploader);
    //     if (!uploaderExists)
    //         throw new Error("Uploader does not exist.");
    //     //kreiraj video, generisi random ID(uuid) dodaj ga u db.videos i vrati ga
    // },

    createComment(parent, args, {
        db,
        pubsub
    }, info) {
        const authorExists = db.users.any(user => user.id === args.author);
        if (!authorExists)
            throw new Error("Author does not exist.");
        const videoExists = db.videos.any(video => video.id === args.video);
        if (!videoExists)
            throw new Error("Video does not exist.");

        const comment = {
            id: uuid(),
            ...args.data
        };

        db.comments.push(comment);
        pubsub.publish(`comment ${args.data.video}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        });

        return comment;
    },

    // deleteComment(parent, args, {
    //     db,
    //     pubsub
    // }, info) {
    //     const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

    //     if (commentIndex === -1)
    //         throw new Error("Comment not found");

    //     const [deletedComment] = db.coments.splice(commentIndex, 1);
    //     pubsub.publish(`comment ${deletedComment.video}`, {
    //         comment: {
    //             mutation: "DELETED",
    //             data: deletedComment
    //         }
    //     })
    // },

    //Isto za updateComment
}

export default Mutation;