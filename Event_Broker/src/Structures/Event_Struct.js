class Event_S 
{
    constructor(_Type, _Topic = "")
    {
        // Set the Type
        this._Type = _Type;
        // Set the Topic if there is one
        (_Topic != "") ? this._Topic = _Topic : this._Topic = undefined;
    }

    // [Internal Function] This will build the Event
    _Builder()
    {
        let eS = {};
        (this._Data) ? eS.Data = this._Data : eS.Data = null;
        (this._Topic) ? eS.Topic = this.Topic : eS.Topic = "Null";
        eS.Type = this._Type;
        this.Event = eS;
        return eS;
    }

    // [External Function] This will add the data field to the Event
    Add_Data(data)
    {
        this._Data = data;
        this._Builder();
    }
}

module.exports = Event_S;