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
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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

    // [Internal Event Handler]
    _PublishEvent(data)
    {

    }

    // [Internal Event Handler]
    _SubscribeEvent(data)
    {
        console.log(`Event Data: [${data}]`);
    }

    // [External Function] Add a new socket to the Manager
    Add(_Socket, Name = "Std_Socket")
    {
        // Set UUID + Name
        _Socket._UUID = this._UUID();
        _Socket._FriendlyName = Name;
        // Register the Sockets Sub/Pub Proxy Events
        _Socket.on("publish", this._PublishEvent.bind(this));
        _Socket.on("subscribe", this._SubscribeEvent.bind(this));
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
};

// Exports
module.exports = { SimpleSocks };