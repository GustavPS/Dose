if (typeof window === "undefined" && process.env.TEST === 'TRUE') {
    const { server } = require("./server");
    server.listen();
}