const PRIVACY_AGREED_KEY = 'zhunzhun_privacy_agreed';

/**
 * @description 是否已同意隐私协议
 */
export function isPrivacyAgreed(): boolean {
  return localStorage.getItem(PRIVACY_AGREED_KEY) === '1';
}

/**
 * @description 标记隐私协议已同意
 */
export function setPrivacyAgreed(): void {
  localStorage.setItem(PRIVACY_AGREED_KEY, '1');
}

/**
 * @description 清除隐私协议同意状态（供演示重置）
 */
export function clearPrivacyAgreed(): void {
  localStorage.removeItem(PRIVACY_AGREED_KEY);
}
