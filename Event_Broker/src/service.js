// This Service will broker Events via a internal TCP Socket Server

const tcp = require('net');

const tcpServer = tcp.createServer()  .on('connection', ConnectionHandler.bind(this))
                                      .on("close", ConnectionCloseHandler.bind(this))
                                      .on("error", ConnectionErrorHandler.bind(this));

tcpServer.listen(7070, "127.0.0.1");

function ConnectionHandler(socket)
{
    socket.write("test");
    socket.close();
}

function ConnectionCloseHandler()
{
    console.log("Connection has been Closed");
}

function ConnectionErrorHandler(cErr)
{
    console.log(`Error: ${cErr}`);
}