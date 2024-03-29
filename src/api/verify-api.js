// 校验URL放行
import { sign, cMsg, ignore } from './request-list';

function urlPattern(url = '') {
  let nurl = url.replaceAll('*', '(.)*').replaceAll('(.)*(.)', '*(.)');
  nurl += '$';
  return nurl;
}

export function verifyUrl(config, type) {
  if (!config) return false;
  const array = type === 'sign' ? sign : cMsg;
  const url = config.url || '';
  return array.find((item) => {
    return new RegExp(urlPattern(item)).test(url);
  });
}

export function verifyRequest(config) {
  const url = config.url || '';
  return !ignore.find((item) => {
    return (
      new RegExp(urlPattern(item.url)).test(url) &&
      (item.httpMethod === '*' || item.httpMethod === config.method) &&
      item.scope !== 'res'
    );
  });
}

export function verifyResponse(config) {
  const url = config.url || '';
  return !ignore.find((item) => {
    return (
      new RegExp(urlPattern(item.url)).test(url) &&
      (item.httpMethod === '*' || item.httpMethod === config.method) &&
      item.scope !== 'req'
    );
  });
}
