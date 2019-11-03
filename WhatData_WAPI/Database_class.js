const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DB {
    constructor(url, database, collection, Quiet = false, LoggerX = false, Debug = false){
        this.url = `mongodb://${url}:27017`;
        this.dbName = database;
        this.collection = collection;

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

    get DatabaseName(){
        return this.dbName;
    }

    get DatabaseCollection(){
        return this.collection;
    }

    get DatabaseURL(){
        return this.url;
    }

    /////// Newer Version of the Database Class

    _DatabaseExecutor(override, _connection)
    {
        // Localize this
        const Env = this._SetEnvironment();

        MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
            assert.equal(null, err);
            if(Env.Debug) console.log("[MongoDB::Connection]\tConnected successfully to server");
            if(!Env.Debug) Env.Log({Namespace: "MongoDB_Connection", Info: "Connected successfully to server"});
            const db = client.db(Env.dbName);
            
            // Get the documents collection
            let collection;
            if(override){
                collection = db.collection(override);
            } else {
                collection = db.collection(Env.dbCollection);
            }

            _connection(collection);

            client.close();
        });
    }

    _SetEnvironment()
    {
        // Localize this
        let Env = {};
        Env.dbName = this.dbName;
        Env.dbCollection = this.collection;
        Env.Log = this.Log; 
        Env.Debug = this.Debug;
        return Env;
    }

    GetSingleRow(query, data, override = false)
    {
        // Localize this
        const Env = this._SetEnvironment();

        this._DatabaseExecutor(override, (collection) => {
            collection.find(query).toArray(function(err, doc) {
                assert.equal(err, null);      
                if(query == "") data(0);
                if(Env.Debug) console.log(`[MongoDB::RetrievalS]\tFound Data with ID => ${doc[0]._ID}`);
                if(!Env.Debug) Env.Log({Namespace: "MongoDB_RetrievalS", Info: `Found Data with ID => ${doc[0]._ID}`});
                data(doc[0]);
            });
        });
    }

    GetAllRows(data, override = false)
    {
        // Localize this
        const Env = this._SetEnvironment();

        this._DatabaseExecutor(override, (collection) => {
            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);      
                if(Env.Debug) console.log("[MongoDB::Retrieval]\tReturning Found Data");
                if(!Env.Debug) Env.Log({Namespace: "MongoDB_Retrieval", Info: "Returning Found Data"});
                data(docs);
            });
        });
    }

    DeleteSingle(dataID, data, override = false)
    {
        // Localize this
        const Env = this._SetEnvironment();

        this._DatabaseExecutor(override, (collection) =>{
            collection.deleteOne({_ID: dataID}, (err, res) => {
                if(err) throw err;
                // console.log(res.deletedCount);    //Debug Print
                if(res.deletedCount == 1){
                    if(Env.Debug) console.log(`[MongoDB::Delete]\tDone Deleting Data with ID => ${dataID}`);
                    if(!Env.Debug) Env.Log({Namespace: "MongoDB_Insert", Info: `Done Deleting Data with ID => ${dataID}`});
                    data(1);
                } else {
                    if(Env.Debug) console.log(`[MongoDB::Delete]\tFailed to Delete Data with ID => ${dataID}`);
                    if(!Env.Debug) Env.Log({Namespace: "MongoDB_Insert", Info: `Failed to Delete Data with ID => ${dataID}`});
                    data(0);
                }
            });
        });
    }

    UpdateRow(query, updateObject, data, override = false)
    {
        // Localize this
        const Env = this._SetEnvironment();

        this._DatabaseExecutor(override, (collection) => {
            collection.updateOne(query, {$set: updateObject, $set: {Updated: Date.now()}}, (err, res) => {
                if(err) throw err;
                // console.log(res.deletedCount);    //Debug Print
                if(res.modifiedCount == 1){
                    if(Env.Debug) console.log(`[MongoDB::Update]\tDone Updating Data with ID => ${dataID}`);
                    if(!Env.Debug) Env.Log({Namespace: "MongoDB_Update", Info: `Done Updating Data with ID => ${dataID}`});
                    data(1);
                } else {
                    console.log(`[MongoDB::Update]\tFailed to Update Data with ID => ${dataID}`);
                    if(Env.Debug) console.log(`[MongoDB::Update]\tFailed to Update Data with ID => ${dataID}`);
                    if(!Env.Debug) Env.Log({Namespace: "MongoDB_Update", Info: `Failed to Update Data with ID => ${dataID}`});
                    data(0);
                }
            });
        });
    }

    InsertRow(dataObject, data, override = false)
    {
         // Localize this
         const Env = this._SetEnvironment();

         this._DatabaseExecutor(override, (collection) => {
            collection.insertOne(dataObject, (err, res) => {
                if(err) throw err;
                if(res.insertedCount != 1) Env.Log({Namespace: "MongoDB_Insert", Info: `[MongoDB::Insert]\tFailed Inserting Data with ID => ${dataObject._ID}`});
                if(Env.Debug) console.log(`[MongoDB::Insert]\tDone Inserting Data with ID => ${dataObject._ID}\n\t\t\tMongo ID => ${res.insertedId}`);
                if(!Env.Debug) Env.Log({Namespace: "MongoDB_Insert", Info: `Done Inserting Data with ID => ${dataObject._ID}\n\t\t\tMongo ID => ${res.insertedId}`});
                data(res.insertedCount);
            });
        });
    }
}

module.exports = DB;