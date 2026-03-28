import cors from 'cors';
import express from 'express';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../data');
const STATE_FILE = join(DATA_DIR, 'app-state.json');

type SalesUser = { r: string; a: string; u: string; p: string; s: number };
type Prize = { name: string; color: string; text: string; desc: string; icon: string; weight: number };
type HistoryEntry = { prize: string; desc: string; time: string; won: boolean };
type AppState = { spinsByUser: Record<string, number>; historyByUser: Record<string, HistoryEntry[]> };

const users: SalesUser[] = JSON.parse(readFileSync(join(DATA_DIR, 'users.json'), 'utf-8'));
const prizes: Prize[] = JSON.parse(readFileSync(join(DATA_DIR, 'prizes.json'), 'utf-8'));

function loadState(): AppState {
  if (!existsSync(STATE_FILE)) return { spinsByUser: {}, historyByUser: {} };
  return JSON.parse(readFileSync(STATE_FILE, 'utf-8')) as AppState;
}

function saveState(state: AppState) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function timestampNow(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${day}/${month}`;
}

const sessions = new Map<string, string>();

function randomToken() {
  return randomBytes(32).toString('hex');
}

function readBearer(req: express.Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  const value = header.slice(7).trim();
  return value || null;
}

function getSessionUserId(req: express.Request): string | null {
  const token = readBearer(req);
  if (!token) return null;
  return sessions.get(token) ?? null;
}

function weightedRandomIndex(list: Prize[]): number {
  const totalWeight = list.reduce((sum, prize) => sum + prize.weight, 0);
  let roll = Math.random() * totalWeight;
  for (let prizeIndex = 0; prizeIndex < list.length; prizeIndex++) {
    roll -= list[prizeIndex]!.weight;
    if (roll <= 0) return prizeIndex;
  }
  return list.length - 1;
}

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/prizes', (_req, res) => {
  res.json({ prizes });
});

app.get('/api/admin/users', (_req, res) => {
  const state = loadState();
  const list = users.map((salesUser) => ({
    r: salesUser.r,
    a: salesUser.a,
    u: salesUser.u,
    remaining: state.spinsByUser[salesUser.u] !== undefined ? state.spinsByUser[salesUser.u] : salesUser.s,
    allocated: salesUser.s,
  }));
  res.json({ users: list });
});

app.post('/api/auth/login', (req, res) => {
  const rawUsername = String(req.body?.username ?? '')
    .trim()
    .toLowerCase();
  const rawPassword = String(req.body?.password ?? '').trim();
  if (!rawUsername || !rawPassword) {
    return res.status(400).json({
      error: 'missing_credentials',
      message: 'Vui lòng nhập đầy đủ thông tin!',
    });
  }
  const salesUser = users.find((row) => row.u === rawUsername && row.p === rawPassword);
  if (!salesUser) {
    return res.status(401).json({
      error: 'invalid_credentials',
      message: 'Mã khách hàng hoặc mật khẩu không đúng!',
    });
  }
  const state = loadState();
  const remaining =
    state.spinsByUser[salesUser.u] !== undefined ? state.spinsByUser[salesUser.u] : salesUser.s;
  const history = state.historyByUser[salesUser.u] ?? [];
  const token = randomToken();
  sessions.set(token, salesUser.u);
  res.json({
    token,
    user: { r: salesUser.r, a: salesUser.a, u: salesUser.u, remaining },
    history,
  });
});

app.post('/api/auth/logout', (req, res) => {
  const token = readBearer(req);
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/session', (req, res) => {
  const userId = getSessionUserId(req);
  if (!userId) return res.status(401).json({ error: 'unauthorized' });
  const salesUser = users.find((row) => row.u === userId);
  if (!salesUser) return res.status(404).json({ error: 'not_found' });
  const state = loadState();
  const remaining =
    state.spinsByUser[userId] !== undefined ? state.spinsByUser[userId] : salesUser.s;
  const history = state.historyByUser[userId] ?? [];
  res.json({
    user: { r: salesUser.r, a: salesUser.a, u: salesUser.u, remaining },
    history,
  });
});

app.post('/api/spin', (req, res) => {
  const userId = getSessionUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'unauthorized', message: 'Phiên đã hết hạn.' });
  }

  const salesUser = users.find((row) => row.u === userId);
  if (!salesUser) return res.status(404).json({ error: 'not_found' });

  const state = loadState();
  let remaining =
    state.spinsByUser[userId] !== undefined ? state.spinsByUser[userId] : salesUser.s;

  if (remaining <= 0) {
    return res.status(400).json({ error: 'no_spins', message: 'Bạn đã hết lượt quay!' });
  }

  remaining -= 1;
  state.spinsByUser[userId] = remaining;

  const prizeIndex = weightedRandomIndex(prizes);
  const prize = prizes[prizeIndex]!;
  const isWin = prize.name !== 'Chúc May Mắn';
  const entry: HistoryEntry = {
    prize: prize.name,
    desc: prize.desc,
    time: timestampNow(),
    won: isWin,
  };
  const nextHistory = [entry, ...(state.historyByUser[userId] ?? [])];
  state.historyByUser[userId] = nextHistory;
  saveState(state);

  res.json({
    prizeIndex,
    prize,
    remaining,
    history: nextHistory,
    isWin,
  });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
