import React from "react"
import { Terminal, ShieldCheck } from "lucide-react"

interface FooterProps {
  totalLinks: number
}

export const Footer: React.FC<FooterProps> = ({ totalLinks }) => {
  return (
    <footer
      id="app-footer"
      className="mt-16 border-t border-neutral-200/80 dark:border-neutral-850 py-8 px-4 sm:px-6 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <span>Nav · A simple navigation website</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>No tracking · Static frontend · Local preferences</span>
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">
            |
          </span>
          <span>
            <strong className="font-medium text-neutral-700 dark:text-neutral-200">
              {totalLinks}
            </strong>{" "}
            curated resources
          </span>
        </div>
      </div>
    </footer>
  )
}
