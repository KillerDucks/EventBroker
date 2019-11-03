const express = require('express');
const API = express();

// Import Routers
const db_router = require("./Routes/route_database");

// Setup JSON requests
API.use(express.json());

// Load Routers
API.use("/v1/database", db_router);

// Handles all non-existent endpoints
API.use(function (req, res, next) {
    res.status(404).json({

        "title": "Data Broker",
        "description": "This is a abstraction layer for microservice database/cache communications.",
        "termsOfService": "https://bindserver.com/terms/api/Data_Broker/v1",
        "contact": {
          "name": "API Support",
          "url": "https://www.bindserver.com/support/api/Data_Broker/v1",
          "email": "API_Support@bindserver.com"
        },
        "version": "1.0.0"

      });
})

API.listen('8080', () => {
    console.log("API listening on Port 8080");
});