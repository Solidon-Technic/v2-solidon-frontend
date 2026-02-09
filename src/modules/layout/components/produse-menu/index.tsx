"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Category = {
  id: string
  name: string
  handle: string
}

const ProduseMenu = ({ categories }: { categories: Category[] }) => {
  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded text-white text-sm font-medium whitespace-nowrap transition-colors focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            Produse
          </PopoverButton>

          <PopoverPanel
            anchor="bottom start"
            transition
            className="z-[100] mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition duration-150 ease-out data-[closed]:opacity-0 data-[closed]:-translate-y-1"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-space_indigo">
                Categorii
              </span>
            </div>
            <ul className="py-1 max-h-80 overflow-y-auto">
              {categories.map((category) => (
                <li key={category.id} className="border-b border-gray-50 last:border-0">
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-parchment hover:text-space_indigo transition-colors"
                    onClick={() => close()}
                  >
                    <span className="w-2 h-2 rounded-sm bg-dusty_grape-600 flex-shrink-0" />
                    {category.name}
                  </LocalizedClientLink>
                </li>
              ))}
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-space_indigo hover:bg-parchment transition-colors"
                  onClick={() => close()}
                >
                  <span className="w-2 h-2 rounded-sm bg-space_indigo flex-shrink-0" />
                  Vezi toate produsele
                </LocalizedClientLink>
              </li>
            </ul>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export default ProduseMenu
