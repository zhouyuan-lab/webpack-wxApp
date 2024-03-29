// 系统配置信息
const settings = {
  // 语言与时区
  language: 'zh-CN',
  timezone: '(UTC-08:00) 太平洋时间(美国和加拿大)',
  dateFormat: '',
  // 请求是否加密
  requestEncrypt: false,
  // 响应是否加密
  responseEncrypt: false,
  /**
   * 开发相关配置
   */
  CLIENT: 'fusion', // 应用公钥
  CLIENT_SECRET: 'fusion_secret', // 应用私钥
  TTL: 180, // 签名有效期
  /**
   * @type {string}
   * @description 密码加密方式:MD5、SM4、SM2
   */
  pwdEncrypType: 'SM4',
};

module.exports = settings;
