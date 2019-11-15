var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

var signStringWithRSAPrivateKey = function(toSign, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");

    const signer = crypto.createSign('sha256');
    signer.update(toSign);
    signer.end();
    const signature = signer.sign(privateKey, "base64")
    return signature;
};

var verifySig = function(toVerify, message, relativeOrAbsolutePathtoPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");

    const verifier = crypto.createVerify('sha256');
    verifier.update(message);
    verifier.end();

    const verified = verifier.verify(publicKey, toVerify, "base64");

    // Debugging
    // console.debug(JSON.stringify({
    //     message: message,
    //     signature: toVerify,
    //     verified: verified,
    // }, null, 2));

    return verified;
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey,
    signStringWithRSAPrivateKey: signStringWithRSAPrivateKey,
    verifySig: verifySig
}