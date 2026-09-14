import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Star,
  X,
  ChevronDown,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../data/links';
import { CategoryIcon } from './CategoryIcon';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectSubCategory: (categoryId: string, subCategoryId: string | null) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  totalCount: number;
  getItemCountByCategory: (categoryId: string) => number;
  getItemCountBySubCategory: (categoryId: string, subCategoryId: string) => number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  totalCount,
  getItemCountByCategory,
  getItemCountBySubCategory,
}) => {
  // Track which category accordion is expanded
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CATEGORIES.forEach((cat) => {
      initial[cat.id] = true;
    });
    return initial;
  });

  const sidebarNavRef = useRef<HTMLElement>(null);

  // Automatically expand the category that contains the selected subcategory or category
  useEffect(() => {
    if (selectedCategory) {
      setExpandedCats((prev) => ({
        ...prev,
        [selectedCategory]: true,
      }));
    }
  }, [selectedCategory, selectedSubCategory]);

  // Keep sidebar view in sync with the active category/subcategory
  useEffect(() => {
    if (!selectedCategory || showFavoritesOnly) {
      if (selectedCategory === null && !showFavoritesOnly && sidebarNavRef.current) {
        sidebarNavRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetId = selectedSubCategory
      ? `sidebar-sub-${selectedSubCategory}`
      : `sidebar-cat-${selectedCategory}`;

    const timer = setTimeout(() => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubCategory, showFavoritesOnly]);

  const toggleAccordion = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleSelectAll = () => {
    if (showFavoritesOnly) onToggleFavoritesOnly();
    onSelectCategory(null);
    onCloseMobile();
  };

  const handleFavoritesClick = () => {
    onToggleFavoritesOnly();
    onCloseMobile();
  };

  const handleCategoryClick = (catId: string) => {
    if (showFavoritesOnly) onToggleFavoritesOnly();
    onSelectSubCategory(catId, null);
    setExpandedCats((prev) => ({ ...prev, [catId]: true }));
    onCloseMobile();
  };

  const handleSubCategoryClick = (catId: string, subId: string) => {
    if (showFavoritesOnly) onToggleFavoritesOnly();
    onSelectSubCategory(catId, subId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          id="sidebar-mobile-backdrop"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200/80 dark:border-neutral-800 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 shrink-0">
          <button
            id="sidebar-logo-btn"
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 font-mono font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
              {'</>'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                  DevNav
                </span>
                <span className="text-[10px] uppercase font-medium px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  Static
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 -mt-0.5">
                开发者工具与文档导航
              </p>
            </div>
          </button>

          {/* Close button on mobile */}
          <button
            id="sidebar-close-mobile-btn"
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <nav ref={sidebarNavRef} className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Navigation */}
          <div>
            <div className="px-2.5 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              概览视图
            </div>
            <div className="space-y-1">
              <button
                id="sidebar-link-all"
                type="button"
                onClick={handleSelectAll}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === null && !showFavoritesOnly
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-neutral-500" />
                  <span>全部资源</span>
                </div>
                <span className="text-[11px] px-2 py-0.2 rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                  {totalCount}
                </span>
              </button>

              <button
                id="sidebar-link-favorites"
                type="button"
                onClick={handleFavoritesClick}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                  showFavoritesOnly
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star
                    className={`w-4 h-4 ${
                      showFavoritesOnly
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-neutral-500'
                    }`}
                  />
                  <span>我的收藏</span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.2 rounded-md font-mono ${
                    showFavoritesOnly
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                      : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {favoritesCount}
                </span>
              </button>
            </div>
          </div>

          {/* Categories & Subcategories Tree Navigation */}
          <div>
            <div className="flex items-center justify-between px-2.5 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                分类与子分类
              </span>
            </div>

            <div className="space-y-1.5">
              {CATEGORIES.map((cat: Category) => {
                const isCatSelected = selectedCategory === cat.id && !showFavoritesOnly;
                const isExpanded = !!expandedCats[cat.id];
                const catCount = getItemCountByCategory(cat.id);
                const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;

                return (
                  <div key={cat.id} className="space-y-0.5">
                    {/* Main Category Row */}
                    <div
                      id={`sidebar-cat-${cat.id}`}
                      className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        isCatSelected
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold shadow-2xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-900 dark:hover:text-neutral-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className="flex-1 flex items-center gap-2.5 text-left truncate"
                      >
                        <CategoryIcon
                          name={cat.iconName}
                          className={`w-4 h-4 shrink-0 ${
                            isCatSelected
                              ? 'text-neutral-900 dark:text-neutral-100'
                              : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                          }`}
                        />
                        <span className="truncate">{cat.name}</span>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                          {catCount}
                        </span>

                        {hasSubcategories && (
                          <button
                            type="button"
                            onClick={(e) => toggleAccordion(cat.id, e)}
                            title={isExpanded ? '收起子分类' : '展开子分类'}
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Subcategories Dropdown Items */}
                    {hasSubcategories && isExpanded && (
                      <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-neutral-100 dark:border-neutral-800/80 ml-4 animate-in fade-in-50 duration-150">
                        {cat.subcategories.map((sub) => {
                          const isSubSelected =
                            selectedCategory === cat.id &&
                            selectedSubCategory === sub.id &&
                            !showFavoritesOnly;
                          const subCount = getItemCountBySubCategory(cat.id, sub.id);

                          return (
                            <button
                              key={sub.id}
                              id={`sidebar-sub-${sub.id}`}
                              type="button"
                              onClick={() => handleSubCategoryClick(cat.id, sub.id)}
                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors ${
                                isSubSelected
                                  ? 'bg-neutral-200/80 dark:bg-neutral-700/60 text-neutral-900 dark:text-neutral-100 font-semibold'
                                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    isSubSelected
                                      ? 'bg-neutral-900 dark:bg-neutral-100'
                                      : 'bg-neutral-300 dark:bg-neutral-700'
                                  }`}
                                />
                                <span className="truncate">{sub.name}</span>
                              </div>
                              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                                {subCount}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};
