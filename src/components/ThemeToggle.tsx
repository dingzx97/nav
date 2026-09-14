import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  resolvedDark: boolean;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  resolvedDark,
  onThemeChange,
}) => {
  return (
    <div
      id="theme-toggle-container"
      className="inline-flex items-center p-1 rounded-lg bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800"
    >
      <button
        id="theme-btn-light"
        type="button"
        title="浅色模式"
        onClick={() => onThemeChange('light')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
          theme === 'light'
            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
            : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        id="theme-btn-dark"
        type="button"
        title="暗色模式"
        onClick={() => onThemeChange('dark')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
          theme === 'dark'
            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
            : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        id="theme-btn-system"
        type="button"
        title="跟随系统"
        onClick={() => onThemeChange('system')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
          theme === 'system'
            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
            : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
