class Queue 
{
    constructor(_Config = {})
    {
        this._MaxStackSize = _Config.MaxQueueSize;

        // Init a new Stack
        this._Stack = [];
    }

    _MaxStackCheck()
    {
        if(this._Stack.length >= this._MaxStackSize)
        {
            // Stack is bigger/equal to the max size
            // Clear the Stack
            this.Clear();
        }
    }

    Length()
    {
        return this._Stack.length;
    }

    // Stack()
    // {
    //     return this._Stack;
    // }

    Clear()
    {
        this._Stack = [];
    }

    Push(data)
    {
        this._MaxStackCheck();
        this._Stack.push(data);
    }

    Pop()
    {
        if(!this._Stack.length == 0)
        {
            return this._Stack.pop();
        }
        return false;
    }

    Remove(index)
    {
        if(!this._Stack.length == 0)
        {
            this._Stack.splice(index, 1);
            return true;
        }
        return false;
    }
};

class SocketQueue extends Queue
{
    constructor(_Config = {})
    {
        // Superman
        super(_Config);
        // Set up Handler
    }

};

module.exports = { Queue, SocketQueue };