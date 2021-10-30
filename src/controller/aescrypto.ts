import * as CryptoJS from "crypto-js";
import { stringify } from "querystring";
import * as crytopconfig from "../config/crypto";

export function crypt(origin: string, key: string): string {
  try {
    return CryptoJS.AES.encrypt(origin, crytopconfig.default.key, { iv: crytopconfig.default.iv }).toString();
  }
  catch (error) {
    throw error;
  }
}

export function cryptObj(origin: string, key: string): string {
  try {
    return CryptoJS.AES.encrypt(stringify(origin), crytopconfig.default.key, { iv: crytopconfig.default.iv }).toString();
  }
  catch (error) {
    throw error;
  }
}

export function decrypt(origin: string): string {
  try {
    if (origin != null && origin.length > 0) {
      var decrypt = CryptoJS.AES.decrypt(origin, crytopconfig.default.key, { iv: crytopconfig.default.iv });
      return decrypt.toString(CryptoJS.enc.Utf8)
    }
    return "";
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export function decryptObj(origin: string): string {
  try {
    if (origin != null && origin.length > 0) {
      var bytes  = CryptoJS.AES.decrypt(origin,  crytopconfig.default.key, { iv: crytopconfig.default.iv });
      var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decrypt
    }
    return "";
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}










