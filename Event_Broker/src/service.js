// This Service will broker Events via a internal TCP Socket Server

const tcp = require('net');
const SocketExample = require("./SocketObj");

const tcpServer = tcp.createServer()  .on('connection', ConnectionHandler.bind(this))
                                      .on("close", ConnectionCloseHandler.bind(this))
                                      .on("error", ConnectionErrorHandler.bind(this));

// Event Broker is listening on Port 7070
tcpServer.listen(7070, "127.0.0.1");

function ConnectionHandler(socket)
{
    // Create Socket Object
    const x = new SocketExample.AdvSocket(socket);
    setInterval(x._TimeoutWrite.bind(x), 1000);
    // socket.close();
}

function ConnectionCloseHandler()
{
    console.log("Connection has been Closed");
}

function ConnectionErrorHandler(cErr)
{
    console.log(`Error: ${cErr}`);
}