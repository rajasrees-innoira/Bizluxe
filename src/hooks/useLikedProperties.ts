import { useCallback, useEffect, useState } from 'react';

const KEY = 'bizluxe_liked_properties';

function read(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useLikedProperties() {
  const [liked, setLiked] = useState<number[]>(() => read());

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(liked));
  }, [liked]);

  const toggleLike = useCallback((id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isLiked = useCallback((id: number) => liked.includes(id), [liked]);

  return { liked: new Set(liked), toggleLike, isLiked };
}