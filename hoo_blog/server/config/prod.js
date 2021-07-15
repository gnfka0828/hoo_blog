const crypto = require('crypto');

const dbInfo = process.env.DBInfo;

const publicKey =
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ORxOpWSFfY0bK0MdYBv\n' +
    '3jO8uxFsOjWR8U1itFsIFpCjvwiWa8xtvguOBbzeZmnCiAWGqgneNcy0Uzzy/mOW\n' +
    'eavmqNbhlQTD7NoAMX/JRDyRBjmePD81KcprcObw3y3H+5TiJ5P4JFB9oN6UOtgM\n' +
    'epf604JNLZdGhhCPhoYSm6T5L8mfeL/qKTaWCBNTFfGyx2g2twJiAglzN/lDNTza\n' +
    '+e9AAHJivtnvFt+8gJsh6FJZDFy5b03mj0X1DqRxzNpSxySvIICCjKi2L5qRdrBV\n' +
    'JhKre4Mf/p4oEvNXzAsmncjTtFog1VneD6iWe+Qc8bGIErHlpmnuxXxCVE0mGNb9\n' +
    'QwIDAQAB\n' +
    '-----END PUBLIC KEY-----';

const encryptPublicKey = function(plainText) {
    const buffer = Buffer.from(plainText);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("hex");
};

const encrypted = encryptPublicKey(JSON.stringify(dbInfo));

module.exports = {
    privatekey: process.env.PrivateKey,
    encryptedDBInfo: encrypted
}