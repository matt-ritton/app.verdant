import { articlesApi } from '@/lib/axios';
import { articleStorage } from '@/lib/storage';

export type Article = {
  title: string;
  author: string;
  content: { html: string };
  featuredImage?: { url: string };
};

const KEY = 'articles';
const LAST_SYNC_KEY = 'articles_lastSync';
const STALE_MS = 24* 60 * 60 * 1000; // 24h

const ARTICLES_QUERY = `
  query MyQuery {
    articles {
      content { html }
      author
      title
      featuredImage { url }
    }
  }
`;

// Sync articles from the API and store them locally
export async function syncArticles(token?: string): Promise<Article[]> {
  try {
    const res = await articlesApi.post(
      '',
      { query: ARTICLES_QUERY },
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    if (res.data?.errors) throw new Error(JSON.stringify(res.data.errors));
    const data: Article[] = res.data?.data?.articles ?? [];
    articleStorage.set(KEY, JSON.stringify(data));
    articleStorage.set(LAST_SYNC_KEY, `${Date.now()}`);
    return data;
  } catch (e) {
    console.error('syncArticles failed:', e);
    return [];
  }
}

// Check if the data is stale
function isStale(): boolean {
  const ts = articleStorage.getString(LAST_SYNC_KEY);
  if (!ts) return true;
  return Date.now() - Number(ts) > STALE_MS;
}

//Read from cache; if empty, sync. If "stale", revalidate in background.
export async function getLocalArticles(opts: { revalidate?: boolean } = { revalidate: true }): Promise<Article[]> {
  const raw = articleStorage.getString(KEY);
  if (!raw) {
    return await syncArticles();
  }

  if (opts.revalidate !== false && isStale()) {
    syncArticles().catch(() => {}); // Revalidate without blocking the UI
  }

  try {
    return JSON.parse(raw) as Article[];
  } catch {
    return [];
  }
}

/// Utilities

// Get articles from storage
export function getArticlesFromStorage<T = Article[]>(): T | null {
  const raw = articleStorage.getString(KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

// Get last sync timestamp
export function getArticlesLastSync(): number | null {
  const ts = articleStorage.getString(LAST_SYNC_KEY);
  return ts ? Number(ts) : null;
}

// Clear articles data
export function clearArticles() {
  articleStorage.delete(KEY);
  articleStorage.delete(LAST_SYNC_KEY);
}