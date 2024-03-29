//smutils.js

const {context,sm4_setkey_enc,sm4_crypt_ecb} =require("./s4") 
import {hexStrToBytes,stringToByte} from "./byte&string"
const base64js = require("./base64js")



//封装sm4.js，实现ECB工作模式

function Sm4utils(key) {
    this.seckey = key;
    this.encryptData_ECB = encryptData_ECB;
    this.decryptData_ECB = decryptData_ECB;

    // this.hexString = false;
    function encryptData_ECB(plainText) {
        var ctx = new context();
        ctx.isPadding = true;
        ctx.mode = 1;
        var keyBytes;
        try {
            if (this.seckey == null) {
                throw "key 不规范"
            }
            // keyBytes = stringToByte(this.seckey);
            keyBytes = hexStrToBytes(this.seckey);
        } catch (e) {
            Error(e.message);
        }
        // alert("key"+keyBytes.length)
        sm4_setkey_enc(ctx, keyBytes);

        var encrypted = sm4_crypt_ecb(ctx, stringToByte(plainText));

        var cipherText = base64js.fromByteArray(encrypted);

        if (cipherText != null && cipherText.trim().length > 0) {
            cipherText.replace(/(\s*|\t|\r|\n)/g, "");
        }
        // alert(cipherText);
        return cipherText;
    }

    function decryptData_ECB(cipherText) {
        try {
            var ctx = new context();
            ctx.isPadding = true;
            ctx.mode = 0;

            /*var keyBytes = stringToByte(this.seckey);*/

            var keyBytes = hexStrToBytes(this.seckey)
            sm4_setkey_dec(ctx, keyBytes);
            /* var decrypted = sm4_crypt_ecb(ctx, base64js.toByteArray(cipherText));*/
            var decrypted = sm4_crypt_ecb(ctx, base64js.toByteArray(cipherText))

            while (decrypted[decrypted.length - 1] === 0) decrypted.pop();
            return byteToString(decrypted);
        } catch (e) {
            Error(e.message);
            return null;
        }
    }

}

module.exports=Sm4utils