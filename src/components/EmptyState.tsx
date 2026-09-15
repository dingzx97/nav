import React from "react";
import { SearchX, Star, RotateCcw, ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  isFavorites?: boolean;
  onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery = "",
  isFavorites = false,
  onClear,
}) => {
  const hasSearch = !!searchQuery.trim();

  // Case 1: Favorites empty with no search query
  if (isFavorites && !hasSearch) {
    return (
      <div
        id="empty-favorites-state"
        className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-200"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center mb-4 text-amber-500 shadow-2xs">
          <Star className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
          No favorites yet
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-6 leading-relaxed">
          You have not saved any tools or documentation yet. Select the star on a card to add it here.
        </p>
        <button
          id="back-to-all-from-empty-fav"
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse all resources</span>
        </button>
      </div>
    );
  }

  // Case 2: Favorites with search query that yielded no results
  if (isFavorites && hasSearch) {
    return (
      <div
        id="empty-favorites-search-state"
        className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-200"
      >
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-850 flex items-center justify-center mb-4 text-neutral-400">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          No matching favorites
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-5 leading-relaxed">
          No favorites match{" "}
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            "{searchQuery}"
          </span>{" "}
          .
        </p>
        <button
          id="clear-fav-search-btn"
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear search</span>
        </button>
      </div>
    );
  }

  // Case 3: Regular search with no results
  return (
    <div
      id="empty-search-state"
      className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-200"
    >
      <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-850 flex items-center justify-center mb-4 text-neutral-400">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
        No matching tools or documentation
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-5 leading-relaxed">
        No results match{" "}
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          "{searchQuery}"
        </span>{" "}
        . Try another search or reset the filters.
      </p>
      <button
        id="clear-search-btn"
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear search</span>
      </button>
    </div>
  );
};
