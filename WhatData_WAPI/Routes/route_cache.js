/**
 * Author: KillerDucks
 * Filename: route_cache.js
 * Description: This is a simple API router for the WhatData_WAPI microservice.
 * Version: 1.0.0
 */

// Import Express Router
const express = require('express');
const router = express.Router();

// Import Route Utils
const utils = require("./utils_route");

// Import Caching Class
const cacheClass = require("../Cache_class");

// Init Cache Class
const Cache = new cacheClass({Address: "localhost", Port: 6379}, false, false, true);

// Middleware, this will produce a timestamp of any request to this router; additionally, this will check the security of all requests
router.use(function timeLog (req, res, next) {

    // Prints a timestamp on a request.
    console.log('Time: ', Date.now());

    // Check the Request security
    console.log(req.body);
    console.log(req.header("authorization"));
    if(!req.body.Security)
    {
        utils.Return_Error_Msg(res, {
            "Code": 403,
            "Message": "Request has no Security description."
        });
    }
    else
    {
        // Verify the authenticity 
        if(!utils.Check_Security(req.body.Security))
        {
            // Return with invalid Key error message
            utils.Return_Error_Msg(res, {
                "Code": 403,
                "Message": "Request has an invalid Security Key."
            }); 
        }
        else
        {
            // Releases the traffic
            next();
        }
    }    
});

// Show error on 
router.get('/', function (req, res) {
    utils.Return_Response(res, {
        "Code": 200,
        "Query_Result": "This is the API endpoint for the Caching Service"
    });
});

// Insert into the cache
router.get('/insert', function (req, res) {
    let d = req.body.Request.Query;
    Cache.SetHash(d, (loop) => {
        utils.Return_Response(res, {
            "Code": (!loop) ? 200 : 0,
            "Query_Result": (!loop) ? "Inserted Successfully" : "Failed to Insert"
        });
    });
});

// Get the Cache via a given name/ID
router.get('/get/:id', function (req, res) {
    let c = req.params.id;
    Cache.GetHash([c], (loop) => {
        utils.Return_Response(res, {
            "Code": (loop) ? 200 : 0,
            "Query_Result": (loop) ? loop : "Failed to Get Results"
        });
    });
});

// Update the Cache via a given name/ID
router.get('/update/:id', function (req, res) {
    let c = req.params.id;
    let d = req.body.Request.Query;

    Cache._HashExist([c], (exist) =>{
       if(exist)
       {
        Cache.SetHashSingle(d, (loop) => {
            utils.Return_Response(res, {
                "Code": (!loop) ? 200 : 0,
                "Query_Result": (!loop) ? "Updated Successfully" : "Failed to Update"
            });
        });
       } 
    });    
});

module.exports = router;