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

// Middleware, this will produce a timestamp of any request to this router; additionally, this will check the security of all requests
router.use(function timeLog (req, res, next) {

    // Prints a timestamp on a request.
    console.log('Time: ', Date.now());

    // Check the Request security
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