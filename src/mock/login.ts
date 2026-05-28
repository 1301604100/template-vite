import type { LoginResponse, ApiResponse } from '@/types/login';

/**
 * @description 模拟网络延迟
 */
function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @description Mock 发送验证码
 */
export async function mockSendVerifyCode(phone_num: string): Promise<ApiResponse> {
  await delay(300);
  if (!/^1\d{10}$/.test(phone_num)) {
    return { code: -1, message: '手机号格式错误', data: null };
  }
  return { code: 0, message: '验证码已发送', data: null };
}

/**
 * @description Mock 登录
 */
export async function mockLogin(
  phone_num: string,
  _verify_code: string,
): Promise<ApiResponse<LoginResponse>> {
  await delay(500);
  return {
    code: 0,
    message: '登录成功',
    data: buildLoginResponse(phone_num),
  };
}

/**
 * @description Mock 获取脱敏本机号码
 */
export async function mockGetMaskedPhone(): Promise<ApiResponse<{ masked_phone: string }>> {
  await delay(300);
  return {
    code: 0,
    message: 'success',
    data: { masked_phone: '153****4578' },
  };
}

/**
 * @description Mock 一键登录
 */
export async function mockOneKeyLogin(): Promise<ApiResponse<LoginResponse>> {
  await delay(500);
  return {
    code: 0,
    message: '登录成功',
    data: buildLoginResponse('15312344578'),
  };
}

function buildLoginResponse(phone_num: string): LoginResponse {
  return {
    user_id: 'mock_user_10086',
    session_token: 'mock_session_token_' + Date.now(),
    user_info: {
      nickname: '塔罗用户',
      avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      phone_num,
    },
  };
}
