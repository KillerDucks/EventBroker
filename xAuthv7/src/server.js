const express = require('express');
const app = express();

const JWT = require("./JWT");

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', (req, res) => {
    res.status(403).send(JSON.stringify({"Status": "403 - Forbidden"}));
});

app.get('/token/create', (req, res) => {
    let jwt = JWT.createJWT({1: "test"});
    res.status(200).send(JSON.stringify({"Status": "200 - Okay", "Data": `Token: ${jwt}`}));
});

app.get("/token/verify", (req, res) => {
    // Get the JWT Token from the Header
    let x = JWT.verifyJWT(req.header("authorization"));
    res.status(200).send(JSON.stringify({"Status": "200 - Okay", "Data": `Token is ${(x) ? "valid" : "not valid"}`}));
});

app.get("/token/valid", (req, res) => {
    // Get the JWT Token from the Header
    let x = JWT.verifyJWT(req.header("authorization"));
    res.status(200).send(JSON.stringify({"Status": "200 - Okay", "Data": `Token is ${(x != -1) ? "valid with an TTL of -> " + x : "not valid"}`}));
});

app.listen(9090, () => {
    console.log("Listening on port 9090");
});
