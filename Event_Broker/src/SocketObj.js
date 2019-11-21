// This Class is a simple wrapper class that contains a `socket` object with some specific additional features.

const net = require('net');
const EventEmitter = require('events');

const Queue = require("./QueueObj");

class AdvSocket
{
    constructor(_Socket = net.Socket, _CacheConnection = undefined)
    {
        // Store the Socket in `this`
        (_Socket) ? this._Socket = _Socket : this._Socket = undefined;
        // Store the Cache Connection (if any) in `this`
        (_CacheConnection) ? this._Cache = _CacheConnection : this._Cache = undefined;
        // Init the other needed object variables
        this._Config = {
            Queue: {
                size: 10,
                holdOnSocketFin: false
            }
        };
        // Create a new Queue to handle the messages
        this._Queue = new Queue.Queue({MaxQueueSize: this._Config.Queue.size});
        // Changes the socket encoding to utf8
        this._Socket.setEncoding("utf8");
        // For use to manage multiple Sockets
        this._UUID = "";
        this._FriendlyName = "";
    }

    // [Internal Function] This function will Queue to a Cache Server (like Redis) to store the Queue
    _Queue2Cache()
    {
        return "Not Yet Implemented";
    }

    // [Internal Function] This function will Queue to a Cache Server (like Redis) to store the Queue
    _SocketValid()
    {
        if(this._Socket == undefined || this._Socket.destroyed)
        {
            return false;
        }

        return true;
    }
    
    // [External Function] This function will replace a socket with a given socket
    ReplaceSocket(_Socket)
    {
        // Check if the current Socket is still Alive
        if(this._SocketValid())
        {
           this._Socket.destroy();
        }

        // Store the Socket in `this`
        (_Socket) ? this._Socket = _Socket : this._Socket = undefined;
        if(this._Socket == undefined)
        {
            return false;
        }
    }

    // [External Function] This is a simple `Getter` and will return the Remote Client Address
    GetRemoteAddr()
    {
        if(this._SocketValid())
        {
            return this._Socket.remoteAddress;
        }
    }

    // [External Function] This function will handle the Queue of messages
    Push(data)
    {
        // console.log(`Adding [${data}] to the Queue`);
        this._Queue.Push(data);
        // console.log(`Current Queue => [${this._Queue._Stack}]`);
    }

    // [External Function] This will Write to the Socket with any given data
    Write(data)
    {
        if(!this._SocketValid())
        {
            return false;
        }
        if(data == false)
        {
            // False data check
            return false;
        }
        // Convert the data into a streamable piece of data
        switch (typeof(data)) {
            case "object":
                // Convert the Object into a String
                data = JSON.stringify(data);
                break;

            case "undefined":
                // Data passed in is undefined
                break;
        }
        if(this._Socket.writable)
        {
            this._Socket.write(data);
        }
        // console.log(data);
        return true;
    }

    // [DEBUG]
    _TimeoutWrite()
    {
        if(!this._SocketValid())
        {
            // console.log(`No Socket => [${this._SocketValid()}]`);
            return false;
        }

        if(this._Queue.Length() == 0)
        {
            // console.log(`No Queue => [${this._Queue.Length()}]`);
            // console.log(`No Queue => [${this._Queue._Stack}]`);
            return false;
        }

        this.Write(this._Queue.Pop());
    }

}

// Exports
module.exports = { AdvSocket };