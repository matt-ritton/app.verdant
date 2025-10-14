// src/storage.ts
import { MMKV} from "react-native-mmkv"

// Storage for app flags (e.g., first open)
export const appStorage = new MMKV({
  id: 'app-storage',
});

// Storage for dictionary data
export const dictStorage = new MMKV({
  id: 'dictionary-storage',
});

export const articleStorage = new MMKV({
  id: 'article-storage',
});

// Storage for classifications data
export const classificationStorage = new MMKV({
  id: 'classification-storage',
});