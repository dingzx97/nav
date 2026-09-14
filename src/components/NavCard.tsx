import React, { useState } from 'react';
import { ExternalLink, Star, Copy, Check, Globe, Sparkles } from 'lucide-react';
import { NavItem } from '../types';
import { getDomain, getFaviconUrl } from '../lib/favicon';

interface NavCardProps {
  item: NavItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const NavCard: React.FC<NavCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const faviconUrl = getFaviconUrl(item.url);
  const domain = getDomain(item.url);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(item.id);
  };

  return (
    <a
      id={`nav-item-${item.id}`}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50">
              {!faviconError && faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={item.title}
                  className="w-5 h-5 object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setFaviconError(true)}
                />
              ) : (
                <Globe className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                {item.featured && (
                  <span
                    title="精选推荐"
                    className="inline-flex items-center p-0.5 text-amber-500 dark:text-amber-400"
                  >
                    <Sparkles className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {domain}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              id={`fav-btn-${item.id}`}
              type="button"
              onClick={handleFavoriteClick}
              title={isFavorite ? '取消收藏' : '收藏'}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Star
                className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`}
              />
            </button>

            <button
              id={`copy-btn-${item.id}`}
              type="button"
              onClick={handleCopy}
              title="复制链接"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <div className="p-1 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>
      </div>

      {/* Footer Tags */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            +{item.tags.length - 3}
          </span>
        )}
      </div>
    </a>
  );
};
