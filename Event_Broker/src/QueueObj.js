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
        if(this._Stack.length <= this._MaxStackSize)
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
        this._Stack.pop();
    }

    Remove(index)
    {
        this._Stack.splice(index, 1);
    }
};

class QueueHandler
{
    constructor()
    {
        // Set up Handler
        this._
    }
};

module.exports = { Queue, QueueHandler };