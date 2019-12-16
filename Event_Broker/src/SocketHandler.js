const Structures = require("./Structures/Structs");
const EventS     = Structures.Event_S;

class SimpleSocks
{
    constructor()
    {
        // Init this._
        this._Sockets = [];
    }

    // [Internal Function] Creates UUID's
    _UUID() 
    {
        return 'Sock-xyxxx-xxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // [Internal Function] Im getting Lazy
    _GetUUID(vanityName)
    {
        const index = this._Sockets.findIndex(s => s._FriendlyName == vanityName);
        if(index != -1)
        {
            return this._Sockets[index]._UUID;
        }
        else
        {
            return false;
        }    
    }

    // [Internal Function] Get a socket via UUID
    _GetSocket(UUID)
    {
        const index = this._Sockets.findIndex(s => s._UUID == UUID);
        if(index != -1)
        {
            return this._Sockets[index];
        }
        else
        {
            return false;
        }   
    }

    // [Internal Event Handler]
    _PublishEvent(data)
    {
        // Assume data is a Event type object

        // console.info("Hit Publish Event")
        // console.info(`Event Published => ${data.Publish.Events}`)

        // Search Sockets to see if they are subbed to this event
        let subSocks = [];
        this._Sockets.forEach(sock => {

            // console.log(`${sock._UUID} => ${sock._Subscriptions}`)

            sock._Subscriptions.forEach(sub => {
                // console.log(`${sock._UUID} -> Loop Subs -> ${sub}`)
                if(sub == data.Publish.Events)
                {
                    subSocks.push(sock);
                    return;
                }
            });
        });
        // // Publish Event to the subbed sockets
        subSocks.forEach(s => {
            console.log(s._UUID)
            s.Push(data.Publish.Data);
        });
    }

    // [Internal Event Handler]
    _SubscribeEvent(data)
    {
        // // Check for objects
        // if(typeof(data) == "object")
        // {
        //     // data = JSON.stringify(data);
        //     if(data.SockID)
        //     {
        //         console.info(this._GetSocket(data.SockID)._Subscriptions);
        //     }
        // }
        // [Debug]
        console.info(`Socket [${data.SockID}] has subscribed to [${data.Subscribe.Events}]`);
    }

    // [External Function] Add a new socket to the Manager
    Add(_Socket, Name = "Std_Socket")
    {
        // Set UUID + Name
        _Socket._UUID = this._UUID();
        _Socket._FriendlyName = Name;
        // Register the Sockets Sub/Pub Proxy Events
        _Socket._Event.on("publish", this._PublishEvent.bind(this));
        _Socket._Event.on("subscribe", this._SubscribeEvent.bind(this));
        // Handle Socket Death
        _Socket._Event.on("fatal", this._SockDeath.bind(this));
        // [DEBUG]
        _Socket.Write(JSON.stringify({Status: 400, Msg: "Example"}));
        // Add Socket to the Array
        this._Sockets.push(_Socket);
        // [DEBUG]
        console.log(`Added new Socket Connection [${_Socket._UUID}]`);
        // Return the Sockets new UUID
        return _Socket._UUID;
    }

    // [External Function] This will Broadcast a Message to all available sockets [TODO] Look into Async functions
    Broadcast(data)
    {
        // Vars
        let completed = 0;
        // Simple Broadcast
        for (const sock in this._Sockets) {
            if (this._Sockets[sock].Write(data)) 
            {
                completed++;    
            }
        }
        if(completed == this._Sockets.length)
        {
            return true;
        }
        else
        {
            // [TODO] Add some sort of return that will show the unsuccessful sockets
            return false;
        }
    }

    // [External Function] Write to a specific socket
    Write(data, UUID = "", vanity = false)
    {
        if(vanity)
        {
            UUID = this._GetUUID(UUID);
        }
        const index = this._Sockets.findIndex(s => s._UUID == UUID);
        if(index != -1)
        {
            this._Sockets[index].Write(data);
            return true;
        }
        else
        {
            return false;
        }        
    }

    // [External Function] Write to a range of socket
    Write(data , UUIDs = [])
    {
        // Set up vars
        let doneWrite = 0;
        // Loop array and write
        for (let index = 0; index < UUIDS.length; index++) {
            if(this.Write(data, UUIDS[index]))
            {
                doneWrite++;
            }
        }

        if(doneWrite != UUIDs.length)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    // [Internal Function] Handle Death of a Socket
    _SockDeath(meta)
    {
        // [TODO] Remove the Socket from the pool
        if(meta)
        {
            console.log(`Socket [${meta}] has Died`);
        }
        else
        {
            console.log("Socket has Died");
        }
    }

};

// Exports
module.exports = { SimpleSocks };