import axios from 'axios';
import { useUserStore } from '@/store/user';

const Request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

/**
 * @description 请求拦截器 — 自动携带 session_token
 */
Request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.sessionToken) {
      config.headers.authorization = 'Bearer ' + userStore.sessionToken;
    }
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * @description 响应拦截器 — 处理异常
 */
Request.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Request;
