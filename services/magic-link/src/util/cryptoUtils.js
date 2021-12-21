const crypto = require('crypto');
const config = require('../config');

const algorithm = 'aes-256-ctr';
const secretKey = config.jwtSigningKey;


function generateBytes() {
  console.log('CALLED');
  return crypto.randomBytes(16);
};

/**
 * Encrypts text using aes-256-ctr algorithm.
 *
 * @param text
 * @returns {{iv: string, content: string}}
 */
function encryptValue(text) {
  const iv = generateBytes();  
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

/**
 * Decrypts hash that was encrypted using aes-256-ctr algorithm.
 *
 * @param hash
 * @returns {string}
 */
 function decryptValue(hash) {
   try{
  console.log('HASH');
  console.log(hash);

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
}
catch (err) {
  console.log(err);
}
};

module.exports = {
  decryptValue,
  encryptValue,
  generateBytes
};
