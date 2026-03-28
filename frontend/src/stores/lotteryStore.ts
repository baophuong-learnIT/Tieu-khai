import { create } from 'zustand';

import {
  fetchAdminUsers,
  fetchPrizes,
  fetchSession,
  postLogin,
  postLogout,
  type AdminUserRow,
} from '@/lib/api';
import { gameAudio } from '@/lib/audio';
import type { HistoryRecord, PrizeDefinition, SalesUser } from '@/types/domain';

const TOKEN_KEY = 'ht_api_token';

export type SessionUser = Pick<SalesUser, 'r' | 'a' | 'u'> & { remaining: number };

export type ResultModalState =
  | {
      prize: PrizeDefinition;
      isWin: boolean;
    }
  | null;

type LotteryState = {
  bootstrapDone: boolean;
  authToken: string | null;
  prizes: PrizeDefinition[];
  view: 'login' | 'main';
  loginError: string;
  sessionUser: SessionUser | null;
  history: HistoryRecord[];
  spinEnabled: boolean;
  modal: ResultModalState;
  adminOpen: boolean;
  confettiEpoch: number;
  adminUsers: AdminUserRow[];
};

type LotteryActions = {
  bootstrap: () => Promise<void>;
  loginWithCredentials: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSpinEnabled: (enabled: boolean) => void;
  applySpinAnimationDone: (payload: { prize: PrizeDefinition; isWin: boolean }) => void;
  clearModal: () => void;
  toggleAdminPanel: () => void;
  setAdminPanelOpen: (open: boolean) => void;
  refreshAdminUsers: () => Promise<void>;
};

function persistToken(token: string | null) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

function readStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export const useLotteryStore = create<LotteryState & LotteryActions>((set, get) => ({
  bootstrapDone: false,
  authToken: null,
  prizes: [],
  view: 'login',
  loginError: '',
  sessionUser: null,
  history: [],
  spinEnabled: true,
  modal: null,
  adminOpen: false,
  confettiEpoch: 0,
  adminUsers: [],

  bootstrap: async () => {
    try {
      const prizeList = await fetchPrizes();
      set({ prizes: prizeList });

      const storedToken = readStoredToken();
      if (storedToken) {
        try {
          const session = await fetchSession(storedToken);
          set({
            authToken: storedToken,
            sessionUser: {
              r: session.user.r,
              a: session.user.a,
              u: session.user.u,
              remaining: session.user.remaining,
            },
            history: session.history,
            view: 'main',
            loginError: '',
          });
        } catch {
          persistToken(null);
          set({ authToken: null });
        }
      }

      const adminList = await fetchAdminUsers();
      set({ adminUsers: adminList, bootstrapDone: true });
    } catch {
      set({ bootstrapDone: true, loginError: 'Không kết nối được máy chủ. Hãy chạy backend (npm run dev:be).' });
    }
  },

  loginWithCredentials: async (rawUsername, rawPassword) => {
    const userId = rawUsername.trim().toLowerCase();
    const password = rawPassword.trim();
    set({ loginError: '' });
    if (!userId || !password) {
      set({ loginError: 'Vui lòng nhập đầy đủ thông tin!' });
      return;
    }
    try {
      const result = await postLogin(userId, password);
      persistToken(result.token);
      set({
        authToken: result.token,
        sessionUser: {
          r: result.user.r,
          a: result.user.a,
          u: result.user.u,
          remaining: result.user.remaining,
        },
        history: result.history,
        view: 'main',
        loginError: '',
      });
      void get().refreshAdminUsers();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      set({ loginError: message });
    }
  },

  logout: async () => {
    const token = get().authToken;
    await postLogout(token);
    persistToken(null);
    set({
      view: 'login',
      sessionUser: null,
      history: [],
      modal: null,
      adminOpen: false,
      spinEnabled: true,
      loginError: '',
      authToken: null,
    });
    void get().refreshAdminUsers();
  },

  setSpinEnabled: (enabled) => set({ spinEnabled: enabled }),

  applySpinAnimationDone: ({ prize, isWin }) => {
    set((state) => ({
      modal: { prize, isWin },
      spinEnabled: true,
      confettiEpoch: isWin ? state.confettiEpoch + 1 : state.confettiEpoch,
    }));
    if (isWin) gameAudio.playWin();
  },

  clearModal: () => set({ modal: null }),

  toggleAdminPanel: () => set((state) => ({ adminOpen: !state.adminOpen })),

  setAdminPanelOpen: (open) => set({ adminOpen: open }),

  refreshAdminUsers: async () => {
    try {
      const adminList = await fetchAdminUsers();
      set({ adminUsers: adminList });
    } catch {
      /* ignore when offline */
    }
  },
}));
