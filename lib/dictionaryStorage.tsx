import { api } from './axios';
import { dictStorage } from './storage';

const KEY = 'dictionary';
const LAST_SYNC_KEY = 'dictionary_lastSync';
const STALE_MS = 24 * 60 * 60 * 1000; // 24h

// Sync dictionary from the API and store it locally
export async function syncDictionary() {
  try {
    const res = await api.get('/get_dictionary');
    if (res.status === 200) {
      dictStorage.set(KEY, JSON.stringify(res.data));
      dictStorage.set(LAST_SYNC_KEY, `${Date.now()}`);
    }
  } catch (e) {
    console.error('syncDictionary failed:', e);
  }
}

// Check if the data is stale
function isStale(): boolean {
  const ts = dictStorage.getString(LAST_SYNC_KEY);
  if (!ts) return true;
  return Date.now() - Number(ts) > STALE_MS;
}

// Read from cache; if empty, sync. If "stale", revalidate in background.
export async function getLocalDictionary(opts: { revalidate?: boolean } = { revalidate: true }) {
  const raw = dictStorage.getString(KEY);
  if (!raw) {
    await syncDictionary();
    const after = dictStorage.getString(KEY);
    return after ? JSON.parse(after) : null;
  }

  if (opts.revalidate !== false && isStale()) {
    syncDictionary().catch(() => { });
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/// Utilities

// Get dictionary from storage
export function getDictionaryFromStorage<T = unknown>(): T | null {
  const raw = dictStorage.getString(KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

// Get last sync timestamp
export function getDictionaryLastSync(): number | null {
  const ts = dictStorage.getString(LAST_SYNC_KEY);
  return ts ? Number(ts) : null;
}

// Clear dictionary data
export function clearDictionary() {
  dictStorage.delete(KEY);
  dictStorage.delete(LAST_SYNC_KEY);
}
