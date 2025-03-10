export const PROD_DOMAIN = 'hsslive.cn';

export const COOKIE_DOMAIN =
  process.env.NODE_ENV === 'development' ? undefined : `.${PROD_DOMAIN}`;

export const QQ_CLIENT_ID = 101958191;
export const QQ_REDIRECT_URI = `https://live-admin.${PROD_DOMAIN}/oauth/qq_login`;

export const GITHUB_CLIENT_ID = '8c2c07b574ae70ecfa9d';
export const GITHUB_REDIRECT_URI = `https://live-admin.${PROD_DOMAIN}/oauth/github_login`;

export const WECHAT_GZH_APPID = ''; // 公众号

export const WECHAT_REDIRECT_URI = `https://live-admin.${PROD_DOMAIN}/oauth/wechat_login`;

export const LIVE_CLIENT_URL = `https://live.${PROD_DOMAIN}`;

export const TENCENTCLOUD_APPID = 1305322458; // 腾讯云APPID
export const TENCENTCLOUD_COS = {
  [`res-${TENCENTCLOUD_APPID}`]: {
    url: `https://tencentcos-res.${PROD_DOMAIN}`,
    Bucket: `res-${TENCENTCLOUD_APPID}`,
    Region: 'ap-guangzhou',
    StorageClass: 'STANDARD',
    prefix: {
      'billd-live/client/common/': 'billd-live/client/common/',
      'billd-live/client/img/': 'billd-live/client/img/',
      'billd-live/client/msg-img/': 'billd-live/client/msg-img/',
    },
  },
};

export const QINIU_KODO = {
  hssblog: {
    domain: `resource.${PROD_DOMAIN}`,
    url: `https://resource.${PROD_DOMAIN}`,
    bucket: 'hssblog',
    prefix: {
      'billd-live/image/': 'billd-live/image/',
      'billd-live/msg-image/': 'billd-live/msg-image/',
    },
  },
  'hss-backup': {
    domain: `backup.${PROD_DOMAIN}`,
    url: `http://backup.${PROD_DOMAIN}`,
    bucket: 'hss-backup',
    prefix: {
      'billd-live/mysql/': 'billd-live/mysql/',
    },
  },
};

export const AXIOS_BASEURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:4300'
    : `https://live-api.${PROD_DOMAIN}`;
