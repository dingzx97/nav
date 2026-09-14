import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'devnav_favorites';

export function useBookmarks() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : ['fe-react', 'fe-mdn', 'tool-github', 'tool-devdocs'];
    } catch {
      return ['fe-react', 'fe-mdn', 'tool-github', 'tool-devdocs'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: (id: string) => favorites.includes(id),
  };
}
