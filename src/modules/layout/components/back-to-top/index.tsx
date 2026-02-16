"use client"

import { ChevronUpMini } from "@medusajs/icons"

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex justify-center py-4">
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-space_indigo underline underline-offset-2 transition-colors"
        aria-label="Înapoi sus"
      >
        Înapoi sus
        <ChevronUpMini className="w-4 h-4" />
      </button>
    </div>
  )
}
