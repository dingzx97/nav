import type { LucideIcon } from "lucide-react"

export type ThemeMode = "light" | "dark" | "system"

export interface NavItem {
  title: string
  description: string
  url: string
  tags: string[]
  icon?: LucideIcon
  featured?: boolean
}

export interface Category {
  title: string
  description: string
  icon?: LucideIcon
  items?: NavItem[]
  subcategories?: Category[]
}
