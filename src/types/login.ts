/** 用户基本信息 */
export interface UserInfo {
  nickname: string;
  avatar: string;
  phone_num: string;
}

/** 登录请求参数 */
export interface LoginReq {
  phone_num: string;
  verify_code: string;
  role?: number;
  platform?: string;
}

/** 登录响应 */
export interface LoginResponse {
  user_id: string;
  session_token: string;
  user_info: UserInfo;
  is_user_first_success?: boolean;
}

/** 发送验证码请求参数 */
export interface SendVerifyCodeReq {
  phone_num: string;
}

/** 通用 API 响应包装 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
