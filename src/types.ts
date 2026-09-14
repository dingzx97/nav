export type ThemeMode = 'light' | 'dark' | 'system';

export interface SubCategory {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
}

export interface NavItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  subCategory?: string;
  tags: string[];
  iconName?: string;
  official?: boolean;
  isCustom?: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  iconName: string;
  subcategories: SubCategory[];
}

