export const prodDomain = 'hsslive.cn';
export const headTitle = prodDomain.split('.')[0];

export const QQ_CLIENT_ID = '101934585';
export const QQ_OAUTH_URL =
  'https://graph.qq.com/oauth2.0/authorize?response_type=code&';

export const GITHUB_CLIENT_ID = '8c2c07b574ae70ecfa9d';
export const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize?';

export const TENCENTCLOUD_APPID = 1324073273; // 腾讯云APPID
export const TENCENTCLOUD_COS_REGION = 'ap-mumbai';
export const TENCENTCLOUD_COS = {
  [`res-${TENCENTCLOUD_APPID}`]: {
    url: `https://res.${prodDomain}`,
    Bucket: `res-${TENCENTCLOUD_APPID}`,
    Region: TENCENTCLOUD_COS_REGION,
    StorageClass: 'STANDARD',
    prefix: {
      'common/': 'common/',
      'images/': 'images/',
      'msg-images/': 'msg-images/',
    },
  },
};

export const QINIU_KODO = {
  hssblog: {
    domain: `resource.${prodDomain}`,
    url: `https://resource.${prodDomain}`,
    bucket: 'hssblog',
    prefix: {
      'billd-live/image/': 'billd-live/image/',
      'billd-live/msg-image/': 'billd-live/msg-image/',
    },
  },
  'hss-backup': {
    domain: `backup.${prodDomain}`,
    url: `http://backup.${prodDomain}`,
    bucket: 'hss-backup',
    prefix: {
      'billd-live/mysql/': 'billd-live/mysql/',
    },
  },
};

export const isBackup = false; // 当前是否是备份模式

let SERVER_IP_TMP = '43.158.212.64';

let LIVE_CLIENT_URL_TMP =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:8000`
    : `https://www.${prodDomain}`;

let WEBSOCKET_URL_TMP =
  process.env.NODE_ENV === 'development'
    ? `ws://localhost:4300`
    : `wss://cdnapi.${prodDomain}`;

let AXIOS_BASEURL_TMP =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:4300` // /api
    : `https://cdnapi.${prodDomain}`;

if (isBackup) {
  WEBSOCKET_URL_TMP = `wss://cdnapicp.${prodDomain}`;
  AXIOS_BASEURL_TMP = `https://cdnapicp.${prodDomain}`;
  LIVE_CLIENT_URL_TMP = `https://wwwcp.${prodDomain}`;
  SERVER_IP_TMP = `43.158.199.134`;
}

export const WEBSOCKET_URL = WEBSOCKET_URL_TMP;
export const AXIOS_BASEURL = AXIOS_BASEURL_TMP;
export const LIVE_CLIENT_URL = LIVE_CLIENT_URL_TMP;
export const SERVER_IP = SERVER_IP_TMP;
