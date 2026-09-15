import { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, Star, ArrowLeft } from "lucide-react";

import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { NavCard } from "./components/NavCard";
import { EmptyState } from "./components/EmptyState";
import { Footer } from "./components/Footer";
import { CategoryIcon } from "./components/CategoryIcon";

import { useTheme } from "./hooks/useTheme";
import { useBookmarks } from "./hooks/useBookmarks";

import { CATEGORIES, NAV_ITEMS } from "./data/links";

import type { NavItem } from "./types";

export default function App() {
  const { theme, resolvedDark, setTheme } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Ref to prevent intersection observer from interfering with smooth scroll clicks
  const isClickScrollingRef = useRef(false);

  // Default navigation items
  const allItems: NavItem[] = NAV_ITEMS;

  // Count items per category
  const getItemCountByCategory = (categoryId: string) => {
    return allItems.filter((item) => item.category === categoryId).length;
  };

  // Count items per subcategory
  const getItemCountBySubCategory = (
    categoryId: string,
    subCategoryId: string,
  ) => {
    return allItems.filter(
      (item) =>
        item.category === categoryId && item.subCategory === subCategoryId,
    ).length;
  };

  // Smooth scroll jump to target element
  const scrollToElement = (elementId: string) => {
    isClickScrollingRef.current = true;
    if (showFavoritesOnly) setShowFavoritesOnly(false);
    if (searchQuery) setSearchQuery("");

    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);
    }, 40);
  };

  const handleCategorySelect = (catId: string | null) => {
    if (!catId) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      if (showFavoritesOnly) setShowFavoritesOnly(false);
      if (searchQuery) setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSelectedCategory(catId);
    setSelectedSubCategory(null);
    scrollToElement(`section-${catId}`);
  };

  const handleSubCategorySelect = (catId: string, subId: string | null) => {
    setSelectedCategory(catId);
    setSelectedSubCategory(subId);
    if (subId) {
      scrollToElement(`section-sub-${subId}`);
    } else {
      scrollToElement(`section-${catId}`);
    }
  };

  // Scrollspy: automatically highlight current category / subcategory while scrolling
  useEffect(() => {
    if (searchQuery || showFavoritesOnly) return;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      // When near the top, highlight all resources
      if (window.scrollY < 160) {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        return;
      }

      // Check which section is in view
      let currentCat: string | null = null;
      let currentSub: string | null = null;

      // Check if user has scrolled near the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollPosition >= documentHeight - 120;

      if (isAtBottom) {
        const lastCat = CATEGORIES[CATEGORIES.length - 1];
        if (lastCat) {
          currentCat = lastCat.id;
          if (lastCat.subcategories && lastCat.subcategories.length > 0) {
            currentSub =
              lastCat.subcategories[lastCat.subcategories.length - 1].id;
          }
        }
      } else {
        for (const cat of CATEGORIES) {
          const catEl = document.getElementById(`section-${cat.id}`);
          if (catEl) {
            const rect = catEl.getBoundingClientRect();
            if (rect.top <= 220 && rect.bottom > 100) {
              currentCat = cat.id;

              for (const sub of cat.subcategories) {
                const subEl = document.getElementById(`section-sub-${sub.id}`);
                if (subEl) {
                  const subRect = subEl.getBoundingClientRect();
                  if (subRect.top <= 220 && subRect.bottom > 80) {
                    currentSub = sub.id;
                    break;
                  }
                }
              }
              break;
            }
          }
        }
      }

      if (currentCat) {
        setSelectedCategory(currentCat);
        setSelectedSubCategory(currentSub);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchQuery, showFavoritesOnly]);

  // Filter items when searching or viewing favorites
  const filteredItems = useMemo(() => {
    if (!showFavoritesOnly && !searchQuery.trim()) {
      return allItems;
    }

    let list = allItems;

    if (showFavoritesOnly) {
      list = list.filter((item) => favorites.includes(item.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const urlMatch = item.url.toLowerCase().includes(q);
        const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(q));
        const categoryMatch = CATEGORIES.some(
          (cat) =>
            cat.id === item.category &&
            (cat.name.toLowerCase().includes(q) ||
              cat.subcategories.some(
                (sub) =>
                  sub.id === item.subCategory &&
                  sub.name.toLowerCase().includes(q),
              )),
        );
        return titleMatch || descMatch || urlMatch || tagMatch || categoryMatch;
      });
    }

    return list;
  }, [allItems, showFavoritesOnly, searchQuery, favorites]);

  // Group all items by category and subcategories for the complete all-resources layout
  const categorizedGroups = useMemo(() => {
    if (showFavoritesOnly || searchQuery.trim()) {
      return null;
    }

    return CATEGORIES.map((cat) => {
      const catItems = allItems.filter((item) => item.category === cat.id);

      // Subcategories with items
      const subGroups = cat.subcategories
        .map((sub) => ({
          subCategory: sub,
          items: catItems.filter((item) => item.subCategory === sub.id),
        }))
        .filter((group) => group.items.length > 0);

      // Items that don't belong to any known subcategory
      const knownSubIds = new Set(cat.subcategories.map((s) => s.id));
      const unclassifiedItems = catItems.filter(
        (item) => !item.subCategory || !knownSubIds.has(item.subCategory),
      );

      return {
        category: cat,
        items: catItems,
        subGroups,
        unclassifiedItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [allItems, showFavoritesOnly, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setShowFavoritesOnly(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors">
      {/* Left Sidebar Navigation */}
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectCategory={handleCategorySelect}
        onSelectSubCategory={handleSubCategorySelect}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => {
          setShowFavoritesOnly((prev) => !prev);
          if (searchQuery) setSearchQuery("");
        }}
        favoritesCount={favorites.length}
        totalCount={allItems.length}
        getItemCountByCategory={getItemCountByCategory}
        getItemCountBySubCategory={getItemCountBySubCategory}
      />

      {/* Main Content Area (Offset by left sidebar on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Bar for Search and Controls */}
        <TopBar
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          resolvedDark={resolvedDark}
          onThemeChange={setTheme}
        />

        {/* Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Primary View: ALL Resources with Subcategories inside each Category */}
          {categorizedGroups ? (
            <div className="space-y-16">
              {categorizedGroups.map(
                ({ category, items, subGroups, unclassifiedItems }) => (
                  <section
                    key={category.id}
                    id={`section-${category.id}`}
                    className="scroll-mt-24 space-y-7"
                  >
                    {/* Category Level Header without right-side subcategory buttons */}
                    <div className="flex items-center gap-3 pb-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80">
                      <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs">
                        <CategoryIcon
                          name={category.iconName}
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {category.name}
                          </h2>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                          </span>
                          <span className="text-[11px] px-2 py-0.2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">
                            {items.length}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Subcategories rendered in the clean subcategory style */}
                    <div className="space-y-8 pl-0.5 sm:pl-1">
                      {subGroups.map(({ subCategory, items: subItems }) => (
                        <div
                          key={subCategory.id}
                          id={`section-sub-${subCategory.id}`}
                          className="space-y-3 scroll-mt-24"
                        >
                          {/* Subcategory Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                {subCategory.name}
                              </h3>
                              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                              </span>
                            </div>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                              {subItems.length} resources
                            </span>
                          </div>

                          {/* Cards Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {subItems.map((item) => (
                              <NavCard
                                key={item.id}
                                item={item}
                                isFavorite={isFavorite(item.id)}
                                onToggleFavorite={toggleFavorite}
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Unclassified links under this category */}
                      {unclassifiedItems.length > 0 && (
                        <div
                          id={`section-other-${category.id}`}
                          className="space-y-3 scroll-mt-24"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                Other resources
                              </h3>
                            </div>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                              {unclassifiedItems.length} resources
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {unclassifiedItems.map((item) => (
                              <NavCard
                                key={item.id}
                                item={item}
                                isFavorite={isFavorite(item.id)}
                                onToggleFavorite={toggleFavorite}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ),
              )}
            </div>
          ) : (
            /* Search Results or Favorites View */
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200/60 dark:border-neutral-850">
                <div className="flex items-center gap-3">
                  {showFavoritesOnly ? (
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                          My bookmarks
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Tools and docs you marked as favorites locally
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                          Search results
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Tools and docs matching "{searchQuery}"
                        </p>
                      </div>
                    </div>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                    {filteredItems.length} items
                  </span>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to all resources</span>
                </button>
              </div>

              {filteredItems.length === 0 ? (
                <EmptyState
                  searchQuery={searchQuery}
                  isFavorites={showFavoritesOnly}
                  onClear={
                    showFavoritesOnly && searchQuery
                      ? () => setSearchQuery("")
                      : resetFilters
                  }
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <NavCard
                      key={item.id}
                      item={item}
                      isFavorite={isFavorite(item.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer totalLinks={allItems.length} />
      </div>
    </div>
  );
}
