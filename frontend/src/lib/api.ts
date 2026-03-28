import type { HistoryRecord, PrizeDefinition, SalesUser } from '@/types/domain';

const API_PREFIX = import.meta.env.VITE_API_URL ?? '';

function apiUrl(path: string) {
  return `${API_PREFIX}${path}`;
}

export type LoginResponse = {
  token: string;
  user: Pick<SalesUser, 'r' | 'a' | 'u'> & { remaining: number };
  history: HistoryRecord[];
};

export type SpinResponse = {
  prizeIndex: number;
  prize: PrizeDefinition;
  remaining: number;
  history: HistoryRecord[];
  isWin: boolean;
};

export type AdminUserRow = Pick<SalesUser, 'r' | 'a' | 'u'> & { remaining: number; allocated: number };

export async function fetchPrizes(): Promise<PrizeDefinition[]> {
  const response = await fetch(apiUrl('/api/prizes'));
  if (!response.ok) throw new Error('Failed to load prizes');
  const body = (await response.json()) as { prizes: PrizeDefinition[] };
  return body.prizes;
}

export async function postLogin(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const body = (await response.json()) as LoginResponse & { message?: string; error?: string };
  if (!response.ok) {
    throw new Error(body.message ?? 'Đăng nhập thất bại');
  }
  return body;
}

export async function postLogout(token: string | null): Promise<void> {
  if (!token) return;
  await fetch(apiUrl('/api/auth/logout'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchSession(token: string): Promise<LoginResponse> {
  const response = await fetch(apiUrl('/api/session'), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Session expired');
  return response.json() as Promise<LoginResponse>;
}

export async function postSpin(token: string): Promise<SpinResponse> {
  const response = await fetch(apiUrl('/api/spin'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = (await response.json()) as SpinResponse & { message?: string };
  if (!response.ok) {
    throw new Error(body.message ?? 'Không thể quay số');
  }
  return body as SpinResponse;
}

export async function fetchAdminUsers(): Promise<AdminUserRow[]> {
  const response = await fetch(apiUrl('/api/admin/users'));
  if (!response.ok) throw new Error('Failed to load admin users');
  const body = (await response.json()) as { users: AdminUserRow[] };
  return body.users;
}
