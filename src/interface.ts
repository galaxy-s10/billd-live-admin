// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 直播间类型 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

/** 是否使用cdn */
export enum LiveRoomUseCDNEnum {
  /** 使用cdn */
  yes,
  /** 不使用cdn */
  no,
}

/** 直播间类型 */
export enum LiveRoomTypeEnum {
  /** 系统推流 */
  system,
  /** 主播使用srs推流 */
  srs,
  /** 主播使用obs/ffmpeg推流 */
  obs,
  /** 主播使用webrtc推流，直播 */
  wertc_live,
  /** 主播使用webrtc推流，会议，实现一 */
  wertc_meeting_one,
  /** 主播使用webrtc推流，会议，实现二 */
  wertc_meeting_two,
  /** 主播使用msr推流 */
  msr,
  /** 主播打pk */
  pk,
  /** 主播使用腾讯云css推流 */
  tencent_css,
  /** 主播使用腾讯云css推流打pk */
  tencent_css_pk,
  /** 转推b站 */
  forward_bilibili,
  /** 转推斗鱼 */
  forward_huya,
  /** 转推所有 */
  forward_all,
}

/** 拉流是否需要鉴权 */
export enum LiveRoomPullIsShouldAuthEnum {
  /** 需要鉴权 */
  yes,
  /** 不需要鉴权 */
  no,
}

/** 直播间状态 */
export enum LiveRoomStatusEnum {
  /** 正常 */
  normal,
  /** 禁用 */
  disable,
}

/** 直播间是否显示 */
export enum LiveRoomIsShowEnum {
  /** 显示 */
  yes,
  /** 不显示 */
  no,
}

/** 直播间是否开启聊天 */
export enum LiveRoomOpenChatEnum {
  yes,
  no,
}

/** 游客能否发言 */
export enum LiveRoomTouristSendMsgEnum {
  yes,
  no,
}

/** 是否显示弹窗广告 */
export enum LiveRoomIsShowAdEnum {
  yes,
  no,
}

/** 关闭房间 */
export enum LiveRoomIsCloseEnum {
  yes,
  no,
}

/** 开启红包 */
export enum LiveRoomIsShowRedbagEnum {
  yes,
  no,
}

/** 开启签到 */
export enum LiveRoomIsShowSigninEnum {
  yes,
  no,
}

/** 开启手机看直播 */
export enum LiveRoomIsShowPhoneLiveEnum {
  yes,
  no,
}

/** 是否显示直播间在线人数 */
export enum LiveRoomIsShowLiveUserNumsEnum {
  yes,
  no,
}

/** 是否开启聊天审核 */
export enum LiveRoomMsgVerifyEnum {
  yes,
  no,
}

/** 是否直播间视频底部的广告图 */
export enum LiveRoomIsShowLiveVideoBottomImgEnum {
  yes,
  no,
}

/** 是否显示公众号二维码 */
export enum LiveRoomIsShowOfficialAccountEnum {
  yes,
  no,
}

/** 是否开启转盘抽奖 */
export enum LiveRoomIsShowTurntableEnum {
  yes,
  no,
}

/** 提醒游客登录 */
export enum LiveRoomTipTouristLoginEnum {
  /** 关闭，即不提醒游客登录 */
  close,
  /** 开启提醒游客登录，游客可关闭 */
  open,
  /** 强制游客登录，即游客不可关闭 */
  force,
}

export interface ILiveRoom {
  id?: number;
  /** 直播间名称 */
  name?: string;
  /** 直播间简介 */
  desc?: string;
  /** 是否使用cdn */
  cdn?: LiveRoomUseCDNEnum;
  /** 拉流是否需要鉴权 */
  pull_is_should_auth?: LiveRoomPullIsShouldAuthEnum;
  /** 权重 */
  priority?: number;
  /** 推流秘钥 */
  key?: string;
  /** 直播间类型 */
  type?: LiveRoomTypeEnum;
  /** 开播预览图 */
  cover_img?: string;
  /** 直播间背景图 */
  bg_img?: string;
  /** 直播间状态 */
  status?: LiveRoomStatusEnum;
  /** 直播间是否显示 */
  is_show?: LiveRoomIsShowEnum;
  /** 直播间是否开启聊天 */
  open_chat?: LiveRoomOpenChatEnum;
  /** 提醒游客登录 */
  tip_tourist_login?: LiveRoomTipTouristLoginEnum;
  /** 提醒游客登录间隔 */
  tip_tourist_login_delay?: number;
  /** 游客能否发言 */
  tourist_send_msg?: LiveRoomTouristSendMsgEnum;
  /** 聊天关键词过滤 */
  keyword_filter_msg?: string;
  /** 用户名关键词过滤 */
  keyword_filter_username?: string;
  /** 历史消息条数 */
  history_msg_total?: number;
  /** 新注册用户不能发言时间(秒) */
  newuser_send_msg_delay?: number;
  /** 房间密码 */
  room_pwd?: string;
  /** 显示弹窗广告 */
  is_show_ad?: LiveRoomIsShowAdEnum;
  /** 弹窗广告图片 */
  ad_img_url?: string;
  /** 关闭房间 */
  is_close?: LiveRoomIsCloseEnum;
  /** 关闭房间描述 */
  is_close_desc?: string;
  /** 发送消息间隔(秒) */
  send_msg_throttle?: number;
  /** 公众号二维码 */
  official_account_img_url?: string;
  /** 是否显示公众号二维码 */
  is_show_official_account?: LiveRoomIsShowOfficialAccountEnum;
  /** 是否开启转盘抽奖 */
  is_show_turntable?: LiveRoomIsShowTurntableEnum;
  /** 是否开启红包 */
  is_show_redbag?: LiveRoomIsShowRedbagEnum;
  /** 是否开启签到 */
  is_show_signin?: LiveRoomIsShowSigninEnum;
  /** 是否开启手机看直播 */
  is_show_phone_live?: LiveRoomIsShowPhoneLiveEnum;
  /** 每天转盘抽奖次数 */
  turntable_num?: number;
  /** 公告 */
  announcement_msg?: string;
  /** 通知 */
  notice_msg?: string;
  /** 系统消息 */
  system_msg?: string;
  /** 显示直播间在线人数 */
  is_show_live_user_nums?: LiveRoomIsShowLiveUserNumsEnum;
  /** 设置直播间最低在线人数 */
  mock_live_user_nums_min?: number;
  /** 设置直播间最高在线人数 */
  mock_live_user_nums_max?: number;
  /** 直播间最在线人数刷新间隔 */
  mock_live_user_nums_refresh_delay?: number;
  /** 聊天审核 */
  msg_verify?: LiveRoomMsgVerifyEnum;
  /** 是否直播间视频底部的广告图 */
  is_show_live_video_bottom_img?: LiveRoomIsShowLiveVideoBottomImgEnum;
  /** 直播间视频底部的广告图 */
  live_video_bottom_img?: string;
  rtmp_url?: string;
  flv_url?: string;
  hls_url?: string;
  webrtc_url?: string;
  push_rtmp_url?: string;
  push_obs_server?: string;
  push_obs_stream_key?: string;
  push_webrtc_url?: string;
  push_srt_url?: string;
  forward_bilibili_url?: string;
  forward_douyu_url?: string;
  forward_huya_url?: string;
  forward_douyin_url?: string;
  forward_kuaishou_url?: string;
  forward_xiaohongshu_url?: string;
  /** 直播间备注 */
  remark?: string;

  /** 用户信息 */
  user?: IUser;
  /** 用户信息 */
  users?: IUser[];
  /** 分区信息 */
  area?: IArea;
  /** 分区信息 */
  areas?: IArea[];
  /** 直播信息 */
  live?: ILive;
  user_live_room?: IUserLiveRoom & { user: IUser };

  hidden_cover_img?: boolean;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRedbagSend {
  id?: number;

  user_id?: number;
  live_room_id?: number;

  total_amount?: string;
  remaining_amount?: string;
  total_nums?: number;
  remaining_nums?: number;
  remark?: string;

  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: IGoods;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum DanmuMsgTypeEnum {
  danmu,
  otherJoin,
  userLeaved,
  system,
  redbag,
}

export enum WsMessageMsgIsFileEnum {
  yes,
  no,
}

export enum WsMessageContentTypeEnum {
  txt,
  img,
  video,
}

export enum WsMessageMsgIsShowEnum {
  yes,
  no,
}

export enum WsMessageMsgIsVerifyEnum {
  yes,
  no,
}

export interface IWsMessage {
  id?: number;
  username?: string;
  origin_username?: string;
  content_type?: WsMessageContentTypeEnum;
  content?: string;
  origin_content?: string;
  redbag_send_id?: number;
  live_room_id?: number;
  user_id?: number;
  ip?: string;
  msg_type?: DanmuMsgTypeEnum;
  user_agent?: string;
  send_msg_time?: number;
  is_show?: WsMessageMsgIsShowEnum;
  is_verify?: WsMessageMsgIsVerifyEnum;
  remark?: string;

  user?: IUser;
  redbag_send?: IRedbagSend;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 直播间类型 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 用户类型 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

export interface IQqUser {
  id?: number;
  client_id?: number;
  openid?: string;
  unionid?: string;
  nickname?: string;
  figureurl?: string;
  figureurl_1?: string;
  figureurl_2?: string;
  figureurl_qq_1?: string;
  figureurl_qq_2?: string;
  constellation?: string;
  gender?: string;
  city?: string;
  province?: string;
  year?: string;
  ret?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IWechatUser {
  id?: number;
  appid?: string;
  openid?: string;
  nickname?: string;
  sex?: number;
  province?: string;
  city?: string;
  country?: string;
  headimgurl?: string;
  privilege?: string;
  unionid?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IEmailUser {
  id?: number;
  email?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

export interface IGithubUser {
  id?: number;
  client_id?: string;
  login?: string;
  github_id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  type?: string;
  site_admin?: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: any;
  hireable?: any;
  bio?: string;
  twitter_username?: any;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  github_created_at?: string;
  github_updated_at?: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

export interface IThirdUser {
  id?: number;
  user_id?: number;
  third_user_id?: number;
  third_platform?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

/** 用户状态 */
export enum UserStatusEnum {
  /** 正常 */
  normal,
  /** 禁用 */
  disable,
}

export enum UserIsTouristEnum {
  yes,
  no,
}

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  status?: UserStatusEnum;
  avatar?: string;
  desc?: string;
  token?: string;
  is_tourist?: UserIsTouristEnum;

  qq_users?: IQqUser[];
  wechat_users?: IWechatUser[];
  github_users?: IGithubUser[];
  email_users?: IEmailUser[];

  roles?: any[];
  auths?: any[];

  user_roles?: number[];
  wallet?: IWallet;

  live_room?: ILiveRoom;
  live_rooms?: ILiveRoom[];

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 用户类型 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

export interface ISearchBase {
  keyWord?: string;
  nowPage?: string;
  pageSize?: string;
  orderBy?: string;
  orderName?: string;
  childNowPage?: number | string;
  childPageSize?: number | string;
  childOrderBy?: string;
  childOrderName?: string;
  childKeyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: string;
  rangTimeEnd?: string;
}

export type ISearch<T, Origin = ISearchBase> = T & Origin;

export interface IApiV1Streams {
  code: number;
  server: string;
  service: string;
  pid: string;
  streams: {
    id: string;
    name: string;
    vhost: string;
    app: string;
    tcUrl: string;
    url: string;
    live_ms: number;
    clients: number;
    frames: number;
    send_bytes: number;
    recv_bytes: number;
    kbps: {
      recv_30s: number;
      send_30s: number;
    };
    publish: {
      active: boolean;
      cid: string;
    };
    video: {
      codec: string;
      profile: string;
      level: string;
      width: number;
      height: number;
    };
    audio: {
      codec: string;
      sample_rate: number;
      channel: number;
      profile: string;
    };
  }[];
}

export interface IApiV1Clients {
  code: number;
  server: string;
  service: string;
  pid: string;
  clients: {
    id: string;
    vhost: string;
    stream: string;
    ip: string;
    pageUrl: string;
    swfUrl: string;
    tcUrl: string;
    url: string;
    name: string;
    type: string;
    publish: boolean;
    alive: number;
    send_bytes: number;
    recv_bytes: number;
    kbps: {
      recv_30s: number;
      send_30s: number;
    };
  }[];
}

export interface IStar {
  id?: number;
  article_id?: number;
  comment_id?: number;
  from_user_id?: number;
  to_user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  from_user?: IUser;
  to_user?: IUser;
  article?: any;
  comment?: any;
}

export enum FormTypeEnum {
  'input' = 'input',
  'password' = 'password',
  'number' = 'number',
  'select' = 'select',
  'radio' = 'radio',
  'checkbox' = 'checkbox',
  'markdown' = 'markdown',
  'switch' = 'switch',
  'upload' = 'upload',
  'treeSelect' = 'treeSelect',
  'datePickerRange' = 'datePickerRange',
  'datePickerDatetime' = 'datePickerDatetime',
}

export interface IBackend {
  id?: number;
  key?: string;
  value?: string;
  desc?: string;
  type?: FormTypeEnum;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IComment {
  id?: number;
  from_user_id?: number;
  content?: string;
  children_comment_total?: number;
  ua?: string;
  ip?: string;
  ip_data?: string;
  parent_comment_id?: number;
  reply_comment_id?: number;
  article_id?: number;
  to_user_id?: number;
  p_comment?: any[];
  to_user?: IUser;
  from_user?: IUser;
  stars?: any[];
  star_total?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IAuth {
  id?: number;
  auth_name?: string;
  auth_value?: string;
  type?: number;
  priority?: number | string;
  p_id?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  c_auths?: number[];
}

export interface IRole {
  id?: number;
  role_name?: string;
  role_value?: string;
  type?: number;
  priority?: number | string;
  p_id?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  role_auths?: number[];
  c_roles?: number[];
}
export interface ITheme {
  id?: number;
  model?: number;
  key?: string;
  value?: string;
  lang?: string;
  desc?: string;
}

export interface IArticle {
  id?: number;
  title?: string;
  desc?: string;
  content?: string;
  head_img?: string | any[] | null;
  is_comment?: number;
  priority?: number;
  status?: number;
  click?: number;
  tags?: number[] | ITag[];
  types?: number[] | IType[];
  users?: number[] | IUser[];
  keyword?: string;
}
export interface IQiniuData {
  id?: number;
  user_id?: number;
  prefix?: string;
  bucket?: string;
  qiniu_key?: string;
  qiniu_hash?: string;
  qiniu_fsize?: number;
  qiniu_mimeType?: string;
  qiniu_putTime?: number;
  qiniu_type?: number;
  qiniu_status?: number;
  qiniu_md5?: string;
}

export interface ILog {
  id?: number;
  user_id?: number;
  api_user_agent?: string;
  api_duration?: number;
  api_from?: number;
  api_forwarded_for?: string;
  api_referer?: string;
  api_real_ip?: string;
  api_host?: string;
  api_hostname?: string;
  api_method?: string;
  api_path?: string;
  api_query?: string;
  api_body?: string;
  api_status_code?: number;
  api_error?: string;
  api_err_msg?: string;
  api_err_code?: number;
}
export interface IVisitorLog {
  id?: number;
  user_id?: number;
  ip?: string;
  status?: number;
  ip_data?: string;
}

export interface IBlacklist {
  id?: number;
  ip?: string;
  user_id?: number;
  type?: number;
  msg?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
export interface IMonit {
  id?: number;
  type?: number;
  info?: string;
}

export interface IWallet {
  id?: number;
  user_id?: number;
  balance?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum PayStatusEnum {
  wait = 'billd_status_wait',
  timeout = 'billd_status_timeout',
  /** （交易创建，等待买家付款） */
  WAIT_BUYER_PAY = 'WAIT_BUYER_PAY',
  /** （交易支付成功） */
  TRADE_SUCCESS = 'TRADE_SUCCESS',
  /** （未付款交易超时关闭，或支付完成后全额退款） */
  TRADE_CLOSED = 'TRADE_CLOSED',
  /** （交易结束，不可退款） */
  TRADE_FINISHED = 'TRADE_FINISHED',
}

export enum GoodsTypeEnum {
  support = 'support',
  sponsors = 'sponsors',
  gift = 'gift',
  recharge = 'recharge',
  qypShop = 'qypShop',
}

export interface IGoods {
  id?: number;
  type?: GoodsTypeEnum;
  name?: string;
  desc?: string;
  short_desc?: string;
  cover?: string;
  price?: number;
  original_price?: number;
  nums?: number;
  pay_nums?: number;
  inventory?: number;
  badge?: string;
  badge_bg?: string;
  remark?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum LoginRecordEnum {
  registerUsername,
  registerId,
  registerQq,
  loginUsername,
  loginId,
  loginQq,
}

export interface ILoginRecord {
  id?: number;
  user_id?: number;
  user_agent?: string;
  type?: LoginRecordEnum;
  ip?: string;
  remark?: string;

  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum GlobalMsgTypeEnum {
  system,
}

export interface IGlobalMsg {
  id?: number;
  user_id?: number;
  type?: GlobalMsgTypeEnum;
  content?: string;
  remark?: string;

  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IOrder {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 商品信息 */
  goods?: IGoods;
  /** 直播间信息 */
  live_room?: IGoods;

  billd_live_user_id?: number;
  billd_live_goods_id?: number;
  billd_live_live_room_id?: number;
  billd_live_order_subject?: string;
  /** 判断幂等 */
  billd_live_order_version?: number;
  client_ip?: string;

  product_code?: string;
  qr_code?: string;
  /** 买家支付宝账号 */
  buyer_logon_id?: string;
  /** 买家实付金额，单位为元，两位小数。 */
  buyer_pay_amount?: string;
  /** 买家在支付宝的用户id */
  buyer_user_id?: string;
  /** 交易的订单金额，单位为元，两位小数。该参数的值为支付时传入的total_amount */
  total_amount?: string;
  /** 交易中用户支付的可开具发票的金额，单位为元，两位小数。 */
  invoice_amount?: string;
  /** 积分支付的金额，单位为元，两位小数。 */
  point_amount?: string;
  /** 实收金额，单位为元，两位小数。该金额为本笔交易，商户账户能够实际收到的金额 */
  receipt_amount?: string;
  /** 支付宝交易号 */
  trade_no?: string;
  /** 商家订单号 */
  out_trade_no?: string;
  /** 交易状态：WAIT_BUYER_PAY（交易创建，等待买家付款）、TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）、TRADE_SUCCESS（交易支付成功）、TRADE_FINISHED（交易结束，不可退款） */
  trade_status?: PayStatusEnum;
  /** 本次交易打款给卖家的时间 */
  send_pay_date?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IAreaLiveRoom {
  id?: number;
  area_id?: number;
  live_room_id?: number;
  /** 分区信息 */
  area?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IArea {
  id?: number;
  name?: string;
  /** 备注 */
  remark?: string;
  /** 权重 */
  priority?: number;
  area_live_rooms?: IAreaLiveRoom[];
  live_room_is_show?: LiveRoomIsShowEnum;
  live_room_status?: LiveRoomStatusEnum;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ISrsPublishStream {
  /** 客户端在获取信息时，必须检查ServerID是否改变，改变时就是服务器重启，之前所有的数据都应该作废了。 */
  srs_server_id?: string;
  srs_service_id?: string;
  srs_action?: string;
  srs_client_id?: string;
  srs_ip?: string;
  srs_vhost?: string;
  srs_app?: string;
  srs_tcUrl?: string;
  srs_stream?: string;
  srs_param?: string;
  srs_stream_url?: string;
  srs_stream_id?: string;
}

export type ILive = {
  id?: number;
  /** 直播平台 */
  platform?: LivePlatformEnum;
  /** 直播流名称 */
  stream_name?: string;
  /** 直播流id */
  stream_id?: string;
  /** 用户id */
  user_id?: number;
  /** 直播间id */
  live_room_id?: number;
  /** 备注 */
  remark?: string;

  /** 直播间信息 */
  live_room?: ILiveRoom;
  /** 用户信息 */
  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

/** 直播平台 */
export enum LivePlatformEnum {
  rtc,
  srs,
  tencentcloud_css,
}

export interface ILiveRecord {
  id?: number;
  /** 直播平台 */
  platform?: LivePlatformEnum;
  /** 直播流名称 */
  stream_name?: string;
  /** 直播流id */
  stream_id?: string;
  /** 用户id */
  user_id?: number;
  /** 直播间id */
  live_room_id?: number;
  /** 直播时长（单位：秒） */
  duration?: number;
  /** 弹幕数 */
  danmu?: number;
  /** 观看数 */
  view?: number;
  /** 直播开始时间 */
  start_time?: string;
  /** 直播结束时间 */
  end_time?: string;
  /** 备注 */
  remark?: string;

  /** 直播间信息 */
  live_room?: ILiveRoom;
  /** 用户信息 */
  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IUserLiveRoom {
  id?: number;
  user_id?: number;
  live_room_id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILink {
  id?: number;
  email?: string;
  name?: string;
  avatar?: string;
  desc?: string;
  url?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
export interface IMusic {
  id?: number;
  name?: string;
  cover_pic?: string | any[] | null;
  author?: string;
  audio_url?: string | any[] | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

export interface IPaging<T> {
  nowPage: number;
  pageSize: number;
  hasMore: boolean;
  total: number;
  rows: T[];
}

// export interface IList {
//   nowPage?: number;
//   pageSize?: number;
//   orderBy?: string;
//   orderName?: string;
//   keyWord?: string;
// }

export type IList<T> = {
  nowPage?: number;
  pageSize?: number;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: string;
  rangTimeEnd?: string;
} & T;
export interface IWorks {
  id?: number;
  name?: string;
  desc?: string;
  url?: string;
  bg_url?: string | any[] | null;
  priority?: string;
  status?: number;
}

export interface ITag {
  id?: number;
  name?: string;
  color?: string;
}
export interface IType {
  id?: number;
  name?: string;
}

export enum modalTypeEnum {
  EDIT = 1,
  ADD = 2,
  BATCH_DELETE = 4,
  BATCH_ADD = 5,
}

export enum modalUserTypeEnum {
  EDIT = 1,
  EDIT_ROLE = 2,
}

export interface ICredential {
  expiredTime: number;
  expiration: string;
  credentials: {
    sessionToken: string;
    tmpSecretId: string;
    tmpSecretKey: string;
  };
  requestId: string;
  startTime: number;
}

export enum ClientEnvEnum {
  android,
  ios,
  ipad,
  web,
  web_mobile,
  web_pc,
  windows,
  macos,
}

export interface ILiveView {
  id?: number;
  /** 直播记录id */
  live_record_id?: number;
  /** 直播间id */
  live_room_id?: number;
  /** 用户id */
  user_id?: number;
  /** 时长（单位：秒） */
  duration?: number;
  user_agent?: string;
  client_env?: ClientEnvEnum;
  /** 备注 */
  remark?: string;

  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  /** 直播记录信息 */
  live_record?: ILiveRecord;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
