import {
  GlobalMsgTypeEnum,
  GoodsTypeEnum,
  LiveRoomTypeEnum,
  LoginRecordEnum,
} from '@/interface';

import { prodDomain } from './spec-config';

export const GITHUB_REPO = 'https://github.com/galaxy-s10/billd-live-admin';

export const REDIRECT_URI = 'https://admin.hsslive.cn/oauth/';

export const LIVE_CLIENT_URL = 'https://live.hsslive.cn';

export const POSTMESSAGE_TYPE = ['qq_login', 'github_login', 'login_expired'];

export const AXIOS_BASEURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:4300'
    : 'https://live-api.hsslive.cn';

export const COOKIE_DOMAIN =
  process.env.NODE_ENV === 'development' ? undefined : `.${prodDomain}`;

export const GlobalMsgTypeEnumMap = {
  [GlobalMsgTypeEnum.system]: '系统消息',
};

export const LoginRecordEnumMap = {
  [LoginRecordEnum.loginId]: '账号密码登录',
  [LoginRecordEnum.loginUsername]: '用户名密码登录',
  [LoginRecordEnum.loginQq]: 'qq登录',
  [LoginRecordEnum.registerId]: '账号密码注册',
  [LoginRecordEnum.registerUsername]: '用户名密码注册',
  [LoginRecordEnum.registerQq]: 'qq注册',
};

export const liveRoomTypeEnumMap = {
  [LiveRoomTypeEnum.msr]: 'msr推流',
  [LiveRoomTypeEnum.obs]: 'obs推流',
  [LiveRoomTypeEnum.pk]: '打pk',
  [LiveRoomTypeEnum.srs]: 'srs推流',
  [LiveRoomTypeEnum.system]: '系统推流',
  [LiveRoomTypeEnum.tencent_css]: '腾讯云css推流',
  [LiveRoomTypeEnum.tencent_css_pk]: '腾讯云css打pk',
  [LiveRoomTypeEnum.wertc_live]: 'webrtc直播',
  [LiveRoomTypeEnum.wertc_meeting_one]: 'webrtc会议一',
  [LiveRoomTypeEnum.wertc_meeting_two]: 'webrtc会议二',
};

// 全局的localStorage的key
export const LOCALSTORAGE_KEY = {
  env: 'env',
  token: 'token',
};

// 全局的cookie的key
export const COOKIE_KEY = {
  loginEnv: 'loginEnv',
};

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

export const DEFAULT_ROLE_INFO = {
  ALL_ROLE: {
    id: 1,
    role_value: 'ALL_ROLE',
  },
  ADMIN: {
    id: 2,
    role_value: 'ADMIN',
  },
  SUPER_ADMIN: {
    id: 3,
    role_value: 'SUPER_ADMIN',
  },
  LIVE_ADMIN: {
    id: 4,
    role_value: 'LIVE_ADMIN',
  },
  USER: {
    id: 5,
    role_value: 'USER',
  },
  VIP_USER: {
    id: 6,
    role_value: 'VIP_USER',
  },
  SVIP_USER: {
    id: 7,
    role_value: 'SVIP_USER',
  },
  TOURIST_USER: {
    id: 8,
    role_value: 'TOURIST_USER',
  },
};

export const ROUTE_ROLES = { SUPER_ADMIN: 'SUPER_ADMIN' };

// 路由sort，值越大越往上
export const ROUTE_SORT = {
  dashboard: 300,

  log: 200,
  monit: 200,
  blacklist: 200,
  visitor: 200,

  comment: 199,
  star: 199,

  schedule: 180,
  live: 180,

  user: 120,
  auth: 110,
  role: 110,
  order: 110,
  goods: 110,
  loginRecord: 110,
  globalMsg: 110,
  thirdUser: 100,

  setting: 90,
  github: 10,

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

export const goodsTypeEnumMap = {
  [GoodsTypeEnum.recharge]: '充值',
  [GoodsTypeEnum.gift]: '礼物',
  [GoodsTypeEnum.sponsors]: '赞助',
  [GoodsTypeEnum.support]: '服务',
  [GoodsTypeEnum.qypShop]: '逸鹏的商品',
};
