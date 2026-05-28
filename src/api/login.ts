import { mockSendVerifyCode, mockLogin, mockGetMaskedPhone, mockOneKeyLogin } from '@/mock/login';
import type { ApiResponse, LoginResponse } from '@/types/login';

/**
 * @description 发送短信验证码
 */
export function sendVerifyCode(phone_num: string): Promise<ApiResponse> {
  return mockSendVerifyCode(phone_num);
}

/**
 * @description 短信验证码登录
 */
export function login(
  phone_num: string,
  verify_code: string,
): Promise<ApiResponse<LoginResponse>> {
  return mockLogin(phone_num, verify_code);
}

/**
 * @description 获取脱敏本机号码
 */
export function getMaskedPhone(): Promise<ApiResponse<{ masked_phone: string }>> {
  return mockGetMaskedPhone();
}

/**
 * @description 一键登录
 */
export function oneKeyLogin(): Promise<ApiResponse<LoginResponse>> {
  return mockOneKeyLogin();
}
