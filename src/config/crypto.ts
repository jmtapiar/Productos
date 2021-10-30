import * as CryptoJS  from "crypto-js";

const config = {
    SALT: CryptoJS.enc.Base64.parse('gTgRkY0PmXL0Ct=F0f=P'),
    ITERATIONS : 1000,
    key : CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"),
    iv : CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f")
}


export default config;