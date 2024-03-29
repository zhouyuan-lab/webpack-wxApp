const CryptoJS = require('crypto-js');


// import { isEmptyObject } from '../utils/is.js';
const { isEmptyObject } = require('../utils/is.js');

import defaultSettings from '../config/sys-settings.js';
// import dayjs from '../utils/dayjs.js';
const dayjs = require('dayjs')
import { getTs } from './app.js';

const Dvalue = () => {
  return `${wx.getStorageSync('ts-D-value')}` === 'null'
    ? 0
    : Number(`${wx.getStorageSync('ts-D-value')}`);
};

const setTs = () => {
  return new Promise((resolve) => {
    getTs()
      .then((res) => {
        if (res && !Number.isNaN(res)) {
          wx.setStorageSync('ts-D-value', `${res - dayjs().unix()}`);
        } else {
          wx.setStorageSync('ts-D-value', '0');
        }
        resolve(true);
      })
      .catch(() => {
        wx.setStorageSync('ts-D-value', '0');
        resolve(true);
      });
  });
};

const objTransUrlParams = (obj) => {
  const params = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (typeof value === 'undefined') {
      value = '';
    }
    params.push([key, value].join('='));
  });
  return params.join('&');
};

const sortUrlParams = (str) => {
  if (typeof str !== 'string') {
    return {};
  }
  const paramObj = {};
  const paramArr = decodeURI(str).split('&');
  for (let i = 0; i < paramArr.length; i++) {
    const tmp = paramArr[i].split('=');
    const key = tmp[0];
    const value = tmp[1] || '';
    if (typeof paramObj[key] === 'undefined') {
      paramObj[key] = value;
    } else {
      const newValue = (
        Array.isArray(paramObj[key]) ? paramObj[key] : [paramObj[key]]
      ) ;
      newValue.push(value);
      paramObj[key] = newValue;
    }
  }
  return paramObj;
};

const objKeySort = (obj) => {
  const newkey = Object.keys(obj).sort();
  const newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
};

// 得到加密后的参数
const getDecParams = (rest) => {
  let Params = '';
  const ts = dayjs().unix() + Dvalue();
  const ttl = defaultSettings.TTL;
  const obj = rest || {};
  Params += `ts=${ts}&ttl=${ttl}&uid=${defaultSettings.CLIENT}${
    isEmptyObject(obj) ? '' : `&${objTransUrlParams(obj)}`
  }`;
  let ParamArr = sortUrlParams(Params);
  ParamArr = objKeySort(ParamArr);
  const paramstrArr = [];
  Object.keys(ParamArr).forEach((i) => {
    paramstrArr.push(`${i}=${ParamArr[i]}`);
  });
  const paramstr = paramstrArr.join('&');
  const signWordArray = CryptoJS.HmacSHA1(paramstr, defaultSettings.CLIENT_SECRET);
  const sign = CryptoJS.enc.Base64.stringify(signWordArray);
  return {
    paramstr,
    signParams: {
      sign,
      ts,
      ttl,
      uid: defaultSettings.CLIENT,
      ...ParamArr,
    },
  };
};

// 获取加密后的参数对象
/**
 * @param {object} 对象中的属性为需要加密的属性
 * @example getSign({ f8s: fileToken })
 * @return
 * {
    f8s: "c15cf2e99c9b46cfc4ced4d2301b6aef"
    sign: "AuBRUDz6qzBXW4B+sg1GiptuIys="
    ts: "1602499441622"
    ttl: "30"
    uid: "fusion"}
 */
const getSign = (rest) => {
  const { signParams } = getDecParams(rest);
  return signParams;
};

// 获取加密后的url参数字符串
/**
 * @param {object} 对象中的属性为需要加密的属性
 * @example 'https://apigateway.ecidi.com/fusion-new/staging/api/sys-storage/download_image?' +  getUrl({ f8s: fileToken })
 * @return https://apigateway.ecidi.com/fusion-new/staging/api/sys-storage/download_image?f8s=4c1c912f03786cfa2473bb880d75e2c0&ts=1602323667077&ttl=30&uid=fusion&sign=xmSwtplBxRp5nSiIjCDju8kizEk%3D
 */
const getUrl = (rest) => {
  const { paramstr, signParams } = getDecParams(rest);
  const encodeSign = encodeURIComponent(signParams.sign);
  return `${paramstr}&sign=${encodeSign}`;
};

export { setTs, getUrl, getSign };
