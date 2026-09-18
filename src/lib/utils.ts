import type { Category, NavItem } from "../types"

export const flattenCategoryTree = (categories: Category[]): NavItem[] =>
  categories.flatMap(category => [
    ...(category.items || []),
    ...(category.subcategories || []).flatMap(subcategory =>
      flattenCategoryTree([subcategory]),
    ),
  ])
