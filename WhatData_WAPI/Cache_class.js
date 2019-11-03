const redis = require("redis");

class Cache {
    constructor(host, Quiet = false, LoggerX = false, Debug = false){
        this.host = host;

        this.Debug = Debug;

        this.Quiet = Quiet;
        this.LoggerX = LoggerX;
        this.Log = undefined;
        if(this.LoggerX == false){
            if(!this.Quiet) { this.Log = function(data) { console.log(`[${data.Namespace}]\t ${data.Info}`) } } else { this.Log = function(data) { /** Do Nothing */ } }
        } else {
            let LoggerX = this.LoggerX;
            this.Log = function(data){ LoggerX.Log(data) }
        }
    }


    _CacheExecutor(_connection)
    {
        // Localize this
        const Env = this._SetEnvironment();

        const client = redis.createClient({host: this.host.Address, port: this.host.Port});

        _connection(client);

        client.quit(() => { console.log("Closed"); });
    }

    _SetEnvironment()
    {
        // Localize this
        let Env = {};
        Env.Log = this.Log; 
        Env.Debug = this.Debug;
        return Env;
    }

    SetHash(data, res = {})
    {
        this._CacheExecutor((exec) => {
            for (let i = 0; i < data.set.length; i++) {                
                exec.hset(data.set[i].name, data.set[i].key, data.set[i].value, (err, resp) => {
                    if(err){
                        console.error(err);
                    }
                    console.log(resp);
                });
            }
        });
    }

    GetHash(data, res = {})
    {
        this._CacheExecutor((exec) => {     
            for (let i = 0; i < data.length; i++) {         
                exec.hkeys(data[i], function (err, replies) {
                    res(replies);
                });
            }
        });
    }

    // Implementation of caching
    /**
     * Pull Data
     *      -> Respond to requester
     *      -> Cache it in Redis with the DB `ID` as the hkey name
     *      
     * Request Data
     *      -> If Req is a GetRow check the cache with the `ID`
     *      -> If
     */
    
};

module.exports = Cache;

