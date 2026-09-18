import React, { useRef, useEffect } from "react"
import { Search, X, Plus, Star, Layers } from "lucide-react"

import { ThemeToggle } from "./ThemeToggle"

import { CATEGORIES } from "../data/links"

import type { ThemeMode } from "../types"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
  showFavoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  favoritesCount: number
  onOpenAddModal: () => void
  theme: ThemeMode
  resolvedDark: boolean
  onThemeChange: (theme: ThemeMode) => void
  totalCount: number
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  onOpenAddModal,
  theme,
  resolvedDark,
  onThemeChange,
  totalCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut '/' or 'Cmd/Ctrl + K'
      if (
        (e.key === "/" && document.activeElement !== inputRef.current) ||
        ((e.metaKey || e.ctrlKey) && e.key === "k")
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      } else if (
        e.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        inputRef.current?.blur()
        if (searchQuery) {
          onSearchChange("")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchQuery, onSearchChange])

  return (
    <header
      id="main-nav-header"
      className="sticky top-0 z-30 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-850 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar: Brand, Search, Actions */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                onSelectCategory(null)
                if (showFavoritesOnly) onToggleFavoritesOnly()
                if (searchQuery) onSearchChange("")
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 font-mono font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
                {"</>"}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                    DevNav
                  </span>
                  <span className="text-[10px] uppercase font-medium px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    Static
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 -mt-0.5">
                  Developer tools and documentation
                </p>
              </div>
            </button>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-lg mx-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-input"
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search tools, docs, or tags (press / or ⌘K)..."
                className="w-full pl-9 pr-14 py-2 text-sm bg-neutral-100/80 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-xl focus:outline-hidden focus:border-neutral-300 dark:focus:border-neutral-700 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    title="Clear search"
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Top Actions: Add custom, Favorites, Theme */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="add-link-header-btn"
              type="button"
              onClick={onOpenAddModal}
              title="Add custom link"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add link</span>
            </button>

            <button
              id="mobile-add-btn"
              type="button"
              onClick={onOpenAddModal}
              title="Add custom link"
              className="sm:hidden p-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            >
              <Plus className="w-4 h-4" />
            </button>

            <ThemeToggle
              theme={theme}
              resolvedDark={resolvedDark}
              onThemeChange={onThemeChange}
            />
          </div>
        </div>

        {/* Bottom Category Filter Bar */}
        <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar border-t border-neutral-100 dark:border-neutral-850/60 text-xs">
          <button
            id="cat-btn-all"
            type="button"
            onClick={() => {
              if (showFavoritesOnly) onToggleFavoritesOnly()
              onSelectCategory(null)
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null && !showFavoritesOnly
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All resources</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === null && !showFavoritesOnly
                  ? "bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800"
                  : "bg-neutral-200/70 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            id="cat-btn-favorites"
            type="button"
            onClick={onToggleFavoritesOnly}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              showFavoritesOnly
                ? "bg-amber-500 text-white"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-white" : ""}`}
            />
            <span>Favorites</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                showFavoritesOnly
                  ? "bg-amber-600 text-white"
                  : "bg-neutral-200/70 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {favoritesCount}
            </span>
          </button>

          <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-1 shrink-0" />

          {CATEGORIES.map(cat => {
            const isSelected =
              selectedCategory === cat.title && !showFavoritesOnly
            return (
              <button
                key={cat.title}
                id={`cat-btn-${cat.title}`}
                type="button"
                onClick={() => {
                  if (showFavoritesOnly) onToggleFavoritesOnly()
                  onSelectCategory(cat.title)
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <span>{cat.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
