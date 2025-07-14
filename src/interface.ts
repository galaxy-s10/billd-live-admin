export interface ISearchBase {
  keyWord?: string;
  nowPage?: string;
  pageSize?: string;
  orderBy?: string;
  orderName?: string;
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

export interface IThirdUser {
  id?: number;
  user_id?: number;
  third_user_id?: number;
  third_platform?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
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
  'datePicker' = 'datePicker',
}

export interface IFrontend {
  id?: number;
  key?: string;
  value?: string;
  desc?: string;
  type?: FormTypeEnum;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
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

export interface IWallet {
  id?: number;
  user_id?: number;
  balance?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  status?: number;
  avatar?: string;
  desc?: string;
  token?: string;

  wallet?: IWallet;
  live_room?: ILiveRoom;

  user_roles?: number[];

  qq_users?: IQqUser[];
  live_rooms?: ILiveRoom[];

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
  remark?: string;
  /** 权重 */
  weight?: number;
  area_live_rooms?: IAreaLiveRoom[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILive {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  socket_id?: string;
  user_id?: number;
  live_room_id?: number;
  /** 1开启;2关闭 */
  track_video?: number;
  /** 1开启;2关闭 */
  track_audio?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILiveRoom {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 用户信息 */
  users?: IUser[];
  /** 分区信息 */
  area?: IArea;
  /** 直播信息 */
  live?: ILive;
  user_live_room?: IUserLiveRoom & { user: IUser };
  name?: string;
  /** 1:使用cdn;2:不使用cdn */
  cdn?: number;
  /** 权重 */
  weight?: number;
  key?: string;
  type?: LiveRoomTypeEnum;
  cover_img?: string;
  rtmp_url?: string;
  flv_url?: string;
  hls_url?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

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
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
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
export interface IList {
  nowPage?: number;
  pageSize?: number;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
}
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
