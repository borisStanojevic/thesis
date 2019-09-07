let users = [{
        id: "123",
        username: "mitar123",
        email: "mitar123@grand.rs",
        firstName: "Mitar",
        lastName: "Miric",
        channelDescription: "No description yet.",
        isBlocked: false,
        isDeleted: false,
        role: 0,
        subscribers: []
    },
    {
        id: "124",
        username: "jovan123",
        email: "jovan123@grand.rs",
        firstName: "Jovan",
        lastName: "Jovanovic",
        channelDescription: "No description yet.",
        isBlocked: false,
        isDeleted: false,
        role: 1,
        subscribers: []
    },
    {
        id: "125",
        username: "pera123",
        email: "pera123@grand.rs",
        firstName: "Pera",
        lastName: "Peric",
        channelDescription: "No description yet.",
        isBlocked: false,
        isDeleted: false,
        role: 1,
        subscribers: []
    }
];

let videos = [];

let comments = [];

const db = {
    users,
    videos,
    comments,
}

// export {db as default};
export default db;