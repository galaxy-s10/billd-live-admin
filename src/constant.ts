import { LiveRoomTypeEnum } from './interface';

export const GITHUB_REPO = 'https://github.com/galaxy-s10/billd-live-admin';
export const REDIRECT_URI = 'https://admin.hsslive.cn/oauth/';

export const QQ_CLIENT_ID = '101934585';
export const QQ_OAUTH_URL =
  'https://graph.qq.com/oauth2.0/authorize?response_type=code&';

export const GITHUB_CLIENT_ID = '8c2c07b574ae70ecfa9d';
export const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize?';

export const QINIU_CDN_URL = 'https://resource.hsslive.cn/';

export const BLOG_CLIENT_URL = 'https://live.hsslive.cn';

export const POSTMESSAGE_TYPE = ['qq_login', 'github_login', 'login_expired'];

export const QINIU_BUCKET = 'hssblog'; // 七牛云bucket

export const QINIU_BLOG = {
  domain: 'resource.hsslive.cn',
  url: 'https://resource.hsslive.cn/',
  bucket: 'hssblog',
  prefix: {
    'image/': 'image/',
    'backupsDatabase/': 'backupsDatabase/',
    'media/': 'media/',
    'nuxt-blog-client/': 'nuxt-blog-client/',
    'billd-live/image/': 'billd-live/image/',
  },
};

export const QINIU_BACKUP = {
  domain: 'backup.hsslive.cn',
  url: 'http://backup.hsslive.cn/',
  bucket: 'hss-backup',
  prefix: {
    'mysql/': 'mysql/',
  },
};

export const liveRoomTypeMap = {
  [LiveRoomTypeEnum.system]: '系统直播',
  [LiveRoomTypeEnum.user_obs]: 'obs直播',
  [LiveRoomTypeEnum.user_srs]: 'srs直播',
  [LiveRoomTypeEnum.user_wertc]: 'webrtc会议',
};

// 全局的localStorage的key
export const LOCALSTORAGE_KEY = {
  currEnv: 'currEnv',
  token: 'token',
};

// 全局的cookie的key
export const COOKIE_KEY = {
  loginEnv: 'loginEnv',
};

export const envList = [
  {
    value: 'beta',
    label: '测试环境',
  },
  {
    value: 'prod',
    label: '正式环境',
  },
  {
    value: 'development',
    label: '本地开发环境',
  },
];

export const MONIT_TYPE_MAP = {
  1: '服务器内存日志',
  2: '服务器内存达到阈值',
  3: '监控七牛云',
  4: '监控node进程',
  5: '重启pm2',
  6: '清除buff/cache',
  7: '备份数据库成功',
  8: '备份数据库失败',
};

export const ROUTE_ROLES = { SUPER_ADMIN: 'SUPER_ADMIN' };

export const USER_ROLE = { SUPER_ADMIN: 'SUPER_ADMIN' };

// 路由sort，值越大越往上
export const ROUTE_SORT = {
  dashboard: 300,

  log: 200,
  monit: 200,
  blacklist: 200,
  visitor: 200,

  comment: 199,
  star: 199,

  setting: 180,
  schedule: 180,
  live: 180,

  user: 120,
  auth: 110,
  role: 110,
  thirdUser: 100,

  // comment: 80,
  // star: 80,

  qiniu: 70,

  article: 60,
  music: 60,
  works: 60,
  link: 60,
  tag: 60,
  type: 60,
  theme: 60,

  error: 10,
};
