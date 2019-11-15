/**
 * Author: KillerDucks
 * Filename: utils_route.js
 * Description: This file has utilities that all routes require.
 * Version: 1.0.0
 */

// Import the HTTP lib
const http = require('http');

// This function check the security description of the request and validates it
function Check_Security(Security, resp = {}) {
    // This will verify against a single Authentication source [TODO] Incorporate with EventBus/AutoDiscovery for Hoz scaling.
    // [POC] The Docker DNS will handle the name resolution for the single Auth Broker [Debug] Using Docker Host IP for now
    http.get("http://localhost:9090/token/verify", {headers: {"Authorization": Security}}, (res) => {
        res.on("data", (data) => {
            let r = JSON.parse(Buffer.from(data).toString("utf8"));
            // [TODO] Change this valid detection Strings are bad
            if(r.Data == "Token is valid")
            {
                // Token is Valid
                console.log("Valid")
                resp(1);
            }
            else
            {
                console.log("!Valid")
                resp(-1);
            }
        });
    }).on("error", (e) => {console.log(e)});
}

// Return simple error messages
function Return_Error_Msg(res, error = {}) {
    res.status(403).json({
        "Timestamp": Date.now(),
        "Security": {
            "Type": "None",
            "Key": null,
            "Broker": -1
        },
        "Payload": {
            "Type": "response",
            "Data": -1
        },
        "Error": error
    });
}

// Return simple payloads
function Return_Response(res, response = {}) {
    res.status(200).json({
        "Timestamp": Date.now(),
        "Security": {
            "Type": "None",
            "Key": null,
            "Broker": -1
        },
        "Payload": {
            "Type": "response",
            "Data": response
        }
    });
}


module.exports = {Check_Security, Return_Error_Msg, Return_Response};