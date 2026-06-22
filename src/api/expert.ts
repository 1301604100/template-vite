import { mockGetExpertProfile } from '@/mock/expert';
import type { ExpertApiResponse, ExpertProfile } from '@/types/expert';

/**
 * @description 获取达人主页详情
 */
export function getExpertProfile(
  expertId: string,
): Promise<ExpertApiResponse<ExpertProfile | null>> {
  return mockGetExpertProfile(expertId);
}
