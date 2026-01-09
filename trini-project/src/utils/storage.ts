import type { WorkEntry } from "../types";

const STORAGE_KEY = "work-journal-entries";

export const getEntries = (): WorkEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveEntry = (entry: WorkEntry): void => {
  const entries = getEntries();
  entries.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const deleteEntry = (id: string): void => {
  const entries = getEntries();
  const filtered = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
