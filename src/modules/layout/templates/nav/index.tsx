import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchBar from "@modules/layout/components/search-bar"
import NavTabs from "@modules/layout/components/nav-tabs"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const categories = await listCategories({ limit: 20, fields: "id, name, handle, *parent_category" })
  const topLevelCategories = (categories || [])
    .filter((cat) => !cat.parent_category)
    .map((cat) => ({ id: cat.id, name: cat.name, handle: cat.handle }))

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Top Header Row */}
      <header className="nav-header bg-space_indigo">
        <div className="content-container flex items-center h-16 gap-4">
          {/* Mobile menu */}
          <div className="small:hidden flex items-center h-full text-white">
            <SideMenu regions={regions} />
          </div>

          {/* Logo */}
          <LocalizedClientLink
            href="/"
            className="text-white text-xl font-bold tracking-wide hover:text-parchment transition-colors whitespace-nowrap"
            data-testid="nav-store-link"
          >
            Solidon
          </LocalizedClientLink>

          {/* Search Bar */}
          <SearchBar />

          {/* Right actions */}
          <div className="hidden small:flex items-center gap-5 ml-auto text-white text-sm whitespace-nowrap">
            <LocalizedClientLink
              href="/account"
              className="flex flex-col items-center hover:text-parchment transition-colors"
              data-testid="nav-account-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="text-xs">Contul meu</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account#wishlist"
              className="flex flex-col items-center hover:text-parchment transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span className="text-xs">Favorite</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex flex-col items-center hover:text-parchment transition-colors"
                  data-testid="nav-cart-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.872l1.877-8.234A1.125 1.125 0 0 0 20.052 3H5.106m2.394 11.25V6.272M7.5 14.25 5.106 5.272"
                    />
                  </svg>
                  <span className="text-xs">Coșul meu</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>

          {/* Mobile cart */}
          <div className="small:hidden text-white">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="hover:text-parchment"
                  data-testid="nav-cart-link"
                >
                  Coș
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Row */}
      <NavTabs categories={topLevelCategories} />
    </div>
  )
}
