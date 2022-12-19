const template = {
    host: "localhost:3000",
    servers: [{ url: "http://localhost:4000", description: "example" }],
    tags: [
        // by default: empty Array
        {
            name: "Users",
            description: "Users router",
        },
        {
            name: "Bids",
            description: "Courses router",
        },
        {
            name: "Posts",
            description: "Posts router",
        },
    ],
    produces: ["application/json"],
    definitions: {},
};

export default template;
