/**
 * Author: KillerDucks
 * Filename: route_database.js
 * Description: This is a simple API router for the WhatData_WAPI microservice.
 * Version: 1.0.0
 */

// Import Express Router
const express = require('express');
const router = express.Router();

// Import Database Class
const dbex = require("../Database_class"); // Improve Paths as this method could break or get confusing later on.

// Init the Database Class
const DBex = new dbex("localhost", "Data_Broker", "AdvChat", false, false, true);

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
        "Query_Result": "This is the API endpoint for the Database Service"
    });
});

// Insert Route
router.get('/insert/:collection', function (req, res) {
    let c = false;
    if(req.params.collection == "") c = req.params.collection;
    let d = req.body.Request.Query;
    DBex.InsertRow(d, (info) => {
        utils.Return_Response(res, {
            "Code": 200,
            "Query_Result": `Inserted Row Count ${info}`
        }, c);
    });
});

// Get Route
router.get('/get/:collection', function (req, res) {
    let c = false;
    if(req.params.collection == "") c = req.params.collection;
    let d = req.body.Request.Query;
    DBex.GetSingleRow(d, (info) => {
        utils.Return_Response(res, {
            "Code": 200,
            "Query_Result": info
        }, c);
    });
});

// Delete route
router.get('/delete/:collection', function (req, res) {
    let c = false;
    if(req.params.collection == "") c = req.params.collection;
    let d = req.body.Request.Query;
    DBex.DeleteSingle(d, (info) => {
        utils.Return_Response(res, {
            "Code": (d) ? 200 : 0,
            "Query_Result": (d) ? `The Row has been deleted` : `Failed to delete the row`
        }, c);
    });
});

// Update route
router.get('/update/:collection', function (req, res) {
    let c = false;
    if(req.params.collection == "") c = req.params.collection;
    let d = req.body.Request.Query;
    DBex.UpdateRow(d.Query, d.Update, (info) => {
        utils.Return_Response(res, {
            "Code": (d) ? 200 : 0,
            "Query_Result": (d) ? `The Row has been updated` : `Failed to update the row`
        }, c);
    });
});

module.exports = router;