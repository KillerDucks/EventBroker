const RSA = require("./RSA");

function createJWT(data)
{
    let header = Buffer.from(JSON.stringify({"typ": "JWT", "alg": "RS256"})).toString("base64");
    // let payload = RSA.encryptStringWithRsaPublicKey(JSON.stringify({"iss": "AuthX Broker", "exp": Date.now() + 10*60*1000, "sub": "DemoUser", "aud": "DemoApp", "Data": data}), "./Keys/rsa_2048_priv.pem");
    let payload = Buffer.from(JSON.stringify({"iss": "AuthX Broker", "exp": Date.now() + 10*60*1000, "sub": "DemoUser", "aud": "DemoApp", "Data": data})).toString("base64");
    let sig = RSA.signStringWithRSAPrivateKey(`${header}.${payload}`, "./Keys/rsa_2048_priv.pem");
    let jwt = `${header}.${payload}.${sig}`;
    return jwt;
}

function verifyJWT(token)
{
    let jwt = token.split('.');
    if(jwt.length != 3)
    {
        return 0;
    }

    return RSA.verifySig(jwt[2], `${jwt[0]}.${jwt[1]}`, "./Keys/rsa_2048_pub.pem");
}

function decodeJWT(token)
{
    let jwt = token.split('.');
    if(jwt.length != 3)
    {
        return 0;
    }

    if(!verifyJWT(token))
    {
        return 0;
    }

    return RSA.decryptStringWithRsaPrivateKey(jwt[1], "./Keys/rsa_2048_priv.pem");
}

function validJWT(token)
{
    let jwt = token.split('.');
    if(jwt.length != 3)
    {
        return 0;
    }
    let message = decodeJWT(token);

    if(Math.sign(JSON.parse(message).exp - Date.now()) == -1)
    {
        return -1
    }
    return new Date(JSON.parse(message).exp - Date.now() + Date.now());
}

module.exports = {
    createJWT: createJWT,
    verifyJWT: verifyJWT,
    validJWT: validJWT,
    decodeJWT: decodeJWT
}