import { useState, useMemo, useRef, useEffect } from "react"
import { Sparkles, Star, ArrowLeft } from "lucide-react"

import { Sidebar } from "./components/Sidebar"
import { TopBar } from "./components/TopBar"
import { NavCard } from "./components/NavCard"
import { EmptyState } from "./components/EmptyState"
import { Footer } from "./components/Footer"

import { useTheme } from "./hooks/useTheme"
import { useBookmarks } from "./hooks/useBookmarks"

import { CATEGORIES } from "./data/links"
import { flattenCategoryTree } from "./lib/utils"

import type { Category, NavItem } from "./types"

const getCategoryItemCount = (category: Category): number =>
  (category.items ?? []).length +
  (category.subcategories ?? []).reduce(
    (count, subcategory) => count + getCategoryItemCount(subcategory),
    0,
  )

export default function App() {
  const { theme, resolvedDark, setTheme } = useTheme()
  const { favorites, toggleFavorite, isFavorite } = useBookmarks()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  )
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const isClickScrollingRef = useRef(false)

  const allItems: NavItem[] = useMemo(() => flattenCategoryTree(CATEGORIES), [])

  const itemLocationMap = useMemo(() => {
    const map = new Map<
      string,
      { categoryTitle: string; subCategoryTitle?: string }
    >()

    const visitCategory = (
      category: Category,
      parentCategoryTitle?: string,
    ) => {
      for (const item of category.items ?? []) {
        map.set(item.title, {
          categoryTitle: parentCategoryTitle ?? category.title,
        })
      }

      for (const subcategory of category.subcategories ?? []) {
        for (const item of subcategory.items ?? []) {
          map.set(item.title, {
            categoryTitle: category.title,
            subCategoryTitle: subcategory.title,
          })
        }

        visitCategory(subcategory, category.title)
      }
    }

    for (const category of CATEGORIES) {
      visitCategory(category)
    }

    return map
  }, [])

  const getItemCountByCategory = (categoryTitle: string) => {
    const category = CATEGORIES.find(item => item.title === categoryTitle)
    return category ? getCategoryItemCount(category) : 0
  }

  const getItemCountBySubCategory = (
    categoryTitle: string,
    subCategoryTitle: string,
  ) => {
    const category = CATEGORIES.find(item => item.title === categoryTitle)
    if (!category) return 0

    const subcategory = (category.subcategories ?? []).find(
      item => item.title === subCategoryTitle,
    )

    return subcategory ? getCategoryItemCount(subcategory) : 0
  }

  const scrollToElement = (elementId: string) => {
    isClickScrollingRef.current = true
    if (showFavoritesOnly) setShowFavoritesOnly(false)
    if (searchQuery) setSearchQuery("")

    setTimeout(() => {
      const el = document.getElementById(elementId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setTimeout(() => {
        isClickScrollingRef.current = false
      }, 800)
    }, 40)
  }

  const handleCategorySelect = (catTitle: string | null) => {
    if (!catTitle) {
      setSelectedCategory(null)
      setSelectedSubCategory(null)
      if (showFavoritesOnly) setShowFavoritesOnly(false)
      if (searchQuery) setSearchQuery("")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setSelectedCategory(catTitle)
    setSelectedSubCategory(null)
    scrollToElement(`section-${catTitle}`)
  }

  const handleSubCategorySelect = (
    catTitle: string,
    subTitle: string | null,
  ) => {
    setSelectedCategory(catTitle)
    setSelectedSubCategory(subTitle)
    if (subTitle) {
      scrollToElement(`section-sub-${subTitle}`)
    } else {
      scrollToElement(`section-${catTitle}`)
    }
  }

  useEffect(() => {
    if (searchQuery || showFavoritesOnly) return

    const handleScroll = () => {
      if (isClickScrollingRef.current) return

      if (window.scrollY < 160) {
        setSelectedCategory(null)
        setSelectedSubCategory(null)
        return
      }

      let currentCat: string | null = null
      let currentSub: string | null = null

      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const isAtBottom = scrollPosition >= documentHeight - 120

      if (isAtBottom) {
        const lastCat = CATEGORIES[CATEGORIES.length - 1]
        if (lastCat) {
          currentCat = lastCat.title
          const lastSubcategories = lastCat.subcategories ?? []
          if (lastSubcategories.length > 0) {
            currentSub = lastSubcategories[lastSubcategories.length - 1].title
          }
        }
      } else {
        for (const cat of CATEGORIES) {
          const catEl = document.getElementById(`section-${cat.title}`)
          if (catEl) {
            const rect = catEl.getBoundingClientRect()
            if (rect.top <= 220 && rect.bottom > 100) {
              currentCat = cat.title

              for (const sub of cat.subcategories ?? []) {
                const subEl = document.getElementById(
                  `section-sub-${sub.title}`,
                )
                if (subEl) {
                  const subRect = subEl.getBoundingClientRect()
                  if (subRect.top <= 220 && subRect.bottom > 80) {
                    currentSub = sub.title
                    break
                  }
                }
              }
              break
            }
          }
        }
      }

      if (currentCat) {
        setSelectedCategory(currentCat)
        setSelectedSubCategory(currentSub)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [searchQuery, showFavoritesOnly])

  const filteredItems = useMemo(() => {
    if (!showFavoritesOnly && !searchQuery.trim()) {
      return allItems
    }

    let list = allItems

    if (showFavoritesOnly) {
      list = list.filter(item => favorites.includes(item.title))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q)
        const descMatch = item.description.toLowerCase().includes(q)
        const urlMatch = item.url.toLowerCase().includes(q)
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(q))
        const categoryInfo = itemLocationMap.get(item.title)
        const categoryMatch =
          categoryInfo &&
          CATEGORIES.some(
            cat =>
              cat.title === categoryInfo.categoryTitle &&
              (cat.title.toLowerCase().includes(q) ||
                (cat.subcategories ?? []).some(
                  sub =>
                    sub.title === categoryInfo.subCategoryTitle &&
                    sub.title.toLowerCase().includes(q),
                )),
          )

        return (
          titleMatch || descMatch || urlMatch || tagMatch || !!categoryMatch
        )
      })
    }

    return list
  }, [allItems, showFavoritesOnly, searchQuery, favorites, itemLocationMap])

  const categorizedGroups = useMemo(() => {
    if (showFavoritesOnly || searchQuery.trim()) {
      return null
    }

    return CATEGORIES.map(cat => {
      const subGroups = (cat.subcategories ?? [])
        .map(sub => ({
          subCategory: sub,
          items: sub.items ?? [],
        }))
        .filter(group => group.items.length > 0)

      const unclassifiedItems = (cat.items ?? []).filter(
        item =>
          !subGroups.some(group =>
            group.items.some(gItem => gItem.title === item.title),
          ),
      )

      return {
        category: cat,
        items: cat.items ?? [],
        subGroups,
        unclassifiedItems,
      }
    }).filter(group => group.items.length > 0 || group.subGroups.length > 0)
  }, [showFavoritesOnly, searchQuery])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setShowFavoritesOnly(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectCategory={handleCategorySelect}
        onSelectSubCategory={handleSubCategorySelect}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => {
          setShowFavoritesOnly(prev => !prev)
          if (searchQuery) setSearchQuery("")
        }}
        favoritesCount={favorites.length}
        totalCount={allItems.length}
        getItemCountByCategory={getItemCountByCategory}
        getItemCountBySubCategory={getItemCountBySubCategory}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <TopBar
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          resolvedDark={resolvedDark}
          onThemeChange={setTheme}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {categorizedGroups ? (
            <div className="space-y-16">
              {categorizedGroups.map(
                ({ category, subGroups, unclassifiedItems }) => (
                  <section
                    key={category.title}
                    id={`section-${category.title}`}
                    className="scroll-mt-24 space-y-7"
                  >
                    <div className="flex items-center gap-3 pb-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80">
                      <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs">
                        {category.icon && <category.icon className="" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {category.title}
                          </h2>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono"></span>
                          <span className="text-[11px] px-2 py-0.2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">
                            {getCategoryItemCount(category)}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8 pl-0.5 sm:pl-1">
                      {subGroups.map(({ subCategory, items: subItems }) => (
                        <div
                          key={subCategory.title}
                          id={`section-sub-${subCategory.title}`}
                          className="space-y-3 scroll-mt-24"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                {subCategory.title}
                              </h3>
                              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono"></span>
                            </div>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                              {subItems.length} resources
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {subItems.map(item => (
                              <NavCard
                                key={item.title}
                                item={item}
                                isFavorite={isFavorite(item.title)}
                                onToggleFavorite={toggleFavorite}
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                      {unclassifiedItems.length > 0 && (
                        <div
                          id={`section-other-${category.title}`}
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
                            {unclassifiedItems.map(item => (
                              <NavCard
                                key={item.title}
                                item={item}
                                isFavorite={isFavorite(item.title)}
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
                  {filteredItems.map(item => (
                    <NavCard
                      key={item.title}
                      item={item}
                      isFavorite={isFavorite(item.title)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        <Footer totalLinks={allItems.length} />
      </div>
    </div>
  )
}
