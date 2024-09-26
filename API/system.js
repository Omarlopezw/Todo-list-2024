const { Server } = require("./server/server.js");

let main = ()=>
{
    let server = new Server();
    
    server.start();
}

main();