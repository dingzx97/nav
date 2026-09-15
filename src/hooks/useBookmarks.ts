import { useEffect, useState } from "react";

const FAVORITES_KEY = "favorites";
const DEFAULT_FAVORITES: string[] = [];

const readFavorites = (): string[] => {
  if (typeof window === "undefined") return [...DEFAULT_FAVORITES];

  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [...DEFAULT_FAVORITES];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [...DEFAULT_FAVORITES];
  } catch {
    return [...DEFAULT_FAVORITES];
  }
};

export function useBookmarks() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage errors in restricted browser contexts.
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: (id: string) => favorites.includes(id),
  };
}
