/**
 * 加密
 * @param word 需要加密的数据
 * @param key
 * @return {string} 加密后的字符串
 */
export function encrypt (word, key) {
  let keys = CryptoJS.enc.Utf8.parse(key);
  let str = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(str, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

/**
 * 解密
 * @param word 需要解密的数据
 * @param key
 * @return {string} 解密后的字符串
 */
export function decrypt (word, key) {
  let keys = CryptoJS.enc.Utf8.parse(key);
  let decrypt = CryptoJS.AES.decrypt(
    CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(word)),
    keys,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypt.toString(CryptoJS.enc.Utf8);
}