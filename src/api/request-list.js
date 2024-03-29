/**
 *  httpMethod:post、get、delete、*
 *  scope:req(传参不加密，返回加密)、res(传参加密，返回不加密)、*(全不加密)
 */
export const ignore = [
  {
    url: '/sys-auth/oauth/token',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/check_captcha',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-gateway/sign/ts',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/behaviour_captcha',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/render_url/WECHAT_ENTERPRISE',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/exit',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/user_info',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-storage/download',
    httpMethod: 'get',
    scope: 'res',
  },
  {
    url: '/sys-auth/oauth/sms_captcha',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/img_captcha',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/oauth/clients',
    httpMethod: 'get',
    scope: '*',
  },
  {
    url: '/sys-system/oauth/client',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/menus/import',
    httpMethod: 'post',
    scope: 'req',
  },
  {
    url: '/sys-system/menus/export',
    httpMethod: '*',
    scope: 'res',
  },
  {
    url: '/sys-system/buttons/import',
    httpMethod: 'post',
    scope: 'req',
  },
  {
    url: '/sys-system/buttons/export',
    httpMethod: '*',
    scope: 'res',
  },
  {
    url: '/sys-system/dictionary/import',
    httpMethod: 'post',
    scope: 'req',
  },
  {
    url: '/sys-system/dictionary/export',
    httpMethod: '*',
    scope: 'res',
  },
  {
    url: '/sys-auth/oauth/check_behaviour_captcha',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-user/users/export',
    httpMethod: '*',
    scope: 'res',
  },
  {
    url: '/sys-user/users/import',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-user/user/template',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-storage/zip',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/tx-sys-user/page',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/tx-sys-system/page',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/tx-sys-user/testUser',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-storage/upload',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/sys-signature/file',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-storage/file',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-signature/license',
    httpMethod: 'post',
    scope: '*',
  },
  {
    url: '/sys-signature/license',
    httpMethod: 'get',
    scope: 'req',
  },
  {
    url: '/sys-system/testSm2',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/testSm4',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/testAes',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/testDes',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-system/testRsa',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-sso/oauth2/login',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-user/oauth/users',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-auth/oauth/user/lock/num',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/system/info',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/licenseInfo',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/license/install',
    httpMethod: '*',
    scope: '*',
  },
  {
    url: '/sys-user/user/register',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/sys-user/user/retrieve/pwd',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/sys-form/**',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/sys-bpm/**',
    httpMethod: '*',
    scope: 'req',
  },
  {
    url: '/cde-collaboration/user/active',
    httpMethod: '*',
    scope: '*',
  },
];

// 需要加签名访问的接口
export const sign = [
  '/sys-auth/oauth/token',
  '/sys-auth/oauth/check_captcha',
  '/sys-auth/oauth/sms_captcha',
  '/sys-auth/oauth/client/exit',
  '/sys-auth/oauth/client/all/exit',
  '/sys-auth/oauth/user/lock/num',
  '/sys-auth/oauth/img_captcha',
  '/sys-auth/oauth/behaviour_captcha',
  '/sys-auth/oauth/check_behaviour_captcha',
  '/sys-user/oauth/user/bind',
  '/sys-user/user/sms_register_captcha',
  '/sys-user/user/register',
  '/sys-user/users/cache/sync',
  '/sys-auth/oauth/sms_captcha',
  '/sys-user/user/retrieve/pwd',
  '/sys-system/clients/cache/sync',
  '/sys-system/dictionary/cache/sync',
  '/sys-system/lang/detail/name',
  '/sys-system/clientInfo',
  '/sys-user/user/fillUserInfo',
  '/sys-system/dictionary/detail/list',
  '/sys-sso/oauth2/login',
  '/sys-auth/oauth/render_url/*',
  '/sys-user/users/check-password',
  '/sys-user/user/phone_captcha',
  '/cde-collaboration/user/change-phone-by-password',
];

// 不需要提示返回信息的接口
export const cMsg = [
  '/sys-auth/oauth/token',
  '/sys-auth/oauth/check_captcha',
  '/sys-auth/oauth/user_info',
  '/sys-auth/oauth/img_captcha',
  '/sys-auth/oauth/sms_captcha',
  '/sys-auth/oauth/behaviour_captcha',
  '/sys-auth/oauth/check_behaviour_captcha',
  '/sys-auth/oauth/render_url/*',
  '/sys-user/oauth/user/bind',
  '/sys-user/user/fillUserInfo',
  '/sys-user/users/cache/sync',
  '/sys-user/user/portals',
  '/sys-auth/oauth/sms_captcha',
  '/sys-gateway/sign/ts',
  '/sys-system/clients/cache/sync',
  '/sys-sso/oauth2/user_info',
  '/sys-sso/oauth2/login',
  '/sys-signature/license',
  '/sys-signature/file',
  '/sys-monitor/analysis',
  '/system/info',
  '/licenseInfo',
  '/cde-collaboration/collaborate/save-submit',
  '/cde-collaboration/delivery/save-submit',
  '/cde-collaboration/delivery/submit',
  '/cde-collaboration/collaborate/submit',
  '/cde-collaboration/treed/delivery-person',
  '/cde-collaboration/meeting/issue-number',
];
