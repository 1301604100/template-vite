import { defineStore } from 'pinia';
import type { UserInfo } from '@/types/login';

const STORAGE_KEY = 'zhunzhun_user';

interface UserState {
  userId: string;
  sessionToken: string;
  userInfo: UserInfo | null;
}

function loadFromStorage(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UserState;
  } catch {
    /* ignore */
  }
  return { userId: '', sessionToken: '', userInfo: null };
}

export const useUserStore = defineStore('user', {
  state: (): UserState => loadFromStorage(),

  getters: {
    isLoggedIn: (state) => !!state.userId && !!state.sessionToken,
  },

  actions: {
    login(userId: string, sessionToken: string, userInfo: UserInfo) {
      this.userId = userId;
      this.sessionToken = sessionToken;
      this.userInfo = userInfo;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
    },
    logout() {
      this.userId = '';
      this.sessionToken = '';
      this.userInfo = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
