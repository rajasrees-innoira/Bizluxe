import { useCallback, useEffect, useState } from 'react';

const KEY = 'bizluxe_recently_viewed';
const MAX = 20;

function read(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<number[]>(() => read());

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(recent));
  }, [recent]);

  const markViewed = useCallback((id: number) => {
    setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX));
  }, []);

  return { recent, markViewed };
}