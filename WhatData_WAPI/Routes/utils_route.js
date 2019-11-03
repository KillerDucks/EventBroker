/**
 * Author: KillerDucks
 * Filename: utils_route.js
 * Description: This file has utilities that all routes require.
 * Version: 1.0.0
 */

// Debug [REMOVE]
const sKey = "SecureToken";

// This function check the security description of the request and validates it
function Check_Security(Security) {
    // This is only for debugging [TODO] Minimal change to JWT Validation
    if(Security.Key == sKey)
    {
        return true;
    }
    return false;
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
    res.status(403).json({
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