/*
 * @Author: your name
 * @Date: 2021-05-17 11:18:31
 * @LastEditTime: 2021-05-17 11:34:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \central-system\src\utils\pwdEncrypt.js
 */
import defaultSettings from '../../config/sys-settings';
import md5 from 'js-md5';
import { SM2Encrypt, SM4Encrypt } from './sm4';

export default function pwdEncrypt(value) {
  if (value) {
    if (defaultSettings.pwdEncrypType) {
      switch (defaultSettings.pwdEncrypType) {
        case 'MD5': {
          return md5(value);
        }
        case 'SM4': {
          return SM4Encrypt(value);
        }
        case 'SM2': {
          return SM2Encrypt(value);
        }
        default:
          return '';
      }
    } else {
      return SM4Encrypt(value);
    }
  }
  return '';
}
