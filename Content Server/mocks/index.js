if (typeof window === "undefined") {
    const { server } = require("./server");
    server.listen();
}