import React, { useRef, useEffect } from "react"
import { Search, X, Menu } from "lucide-react"

import { ThemeToggle } from "./ThemeToggle"

import type { ThemeMode } from "../types"

interface TopBarProps {
  onOpenMobileMenu: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  theme: ThemeMode
  resolvedDark: boolean
  onThemeChange: (theme: ThemeMode) => void
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  theme,
  resolvedDark,
  onThemeChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      id="main-topbar"
      className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left side: Hamburger button on mobile */}
        <div className="flex items-center shrink-0">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={onOpenMobileMenu}
            title="Open navigation"
            className="lg:hidden p-2 -ml-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-input"
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search tools, docs, categories, or tags (press / or ⌘K)..."
              className="w-full pl-9 pr-14 py-2 text-sm bg-neutral-100 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-xl focus:outline-hidden focus:border-neutral-300 dark:focus:border-neutral-700 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all"
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

        {/* Right side: Preserved Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle
            theme={theme}
            resolvedDark={resolvedDark}
            onThemeChange={onThemeChange}
          />
        </div>
      </div>
    </header>
  )
}
