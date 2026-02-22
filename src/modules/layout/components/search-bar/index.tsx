"use client"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { searchSuggestions } from "@lib/data/search-suggestions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

const SearchBar = () => {
  const router = useRouter()
  const { countryCode } = useParams<{ countryCode: string }>()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<{
    products: HttpTypes.StoreProduct[]
    categories: HttpTypes.StoreProductCategory[]
  }>({ products: [], categories: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSearchedQuery, setLastSearchedQuery] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      const trimmed = searchQuery.trim()
      if (!countryCode || trimmed.length < MIN_QUERY_LENGTH) {
        setSuggestions({ products: [], categories: [] })
        setLastSearchedQuery(null)
        return
      }
      setIsLoading(true)
      try {
        const result = await searchSuggestions(trimmed, countryCode)
        setSuggestions(result)
        setLastSearchedQuery(trimmed)
        setIsOpen(true)
      } finally {
        setIsLoading(false)
      }
    },
    [countryCode]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query)
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSuggestionClick = () => {
    setIsOpen(false)
  }

  const hasSuggestions =
    suggestions.products.length > 0 || suggestions.categories.length > 0
  const hasSearchedAndEmpty =
    lastSearchedQuery === query.trim() && !isLoading && !hasSuggestions
  const showDropdown =
    isOpen &&
    query.trim().length >= MIN_QUERY_LENGTH &&
    (isLoading || hasSuggestions || hasSearchedAndEmpty)

  return (
    <form onSubmit={handleSubmit} className="nav-search flex-1 max-w-3xl mx-4 min-w-[280px]">
      <div ref={containerRef} className="relative flex items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() =>
            query.trim().length >= MIN_QUERY_LENGTH && setIsOpen(true)
          }
          placeholder="Caută în milioane de produse..."
          className="w-full h-9 pl-4 pr-10 rounded-full bg-white text-gray-900 text-sm placeholder-gray-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-500 transition-colors"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-transparent hover:opacity-70 transition-opacity"
          aria-label="Caută"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-neutral-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        {showDropdown && (
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto z-50"
            role="listbox"
          >
            {isLoading ? (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                Se caută...
              </div>
            ) : (
              <>
                {suggestions.categories.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Categorii
                    </div>
                    {suggestions.categories.map((category) => (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        onClick={handleSuggestionClick}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-sm bg-primary-500 flex-shrink-0" />
                        {category.name}
                      </LocalizedClientLink>
                    ))}
                  </div>
                )}

                {suggestions.products.length > 0 && (
                  <div className="py-2 border-t border-gray-100">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Produse
                    </div>
                    {suggestions.products.map((product) => {
                      const { cheapestPrice } = getProductPrice({ product })
                      const imageUrl =
                        product.thumbnail || product.images?.[0]?.url
                      return (
                        <LocalizedClientLink
                          key={product.id}
                          href={`/products/${product.handle}`}
                          onClick={handleSuggestionClick}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={product.title || ""}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <PlaceholderImage size={16} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium text-gray-900">
                              {product.title}
                            </div>
                            {cheapestPrice && (
                              <div className="text-xs text-gray-500">
                                {cheapestPrice.calculated_price}
                              </div>
                            )}
                          </div>
                        </LocalizedClientLink>
                      )
                    })}
                  </div>
                )}

                {hasSuggestions && (
                  <div className="border-t border-gray-100">
                    <LocalizedClientLink
                      href={`/store?q=${encodeURIComponent(query.trim())}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-primary-500 hover:bg-neutral-50 transition-colors"
                    >
                      Vezi toate rezultatele
                    </LocalizedClientLink>
                  </div>
                )}

                {!hasSuggestions && !isLoading && (
                  <div className="px-4 py-6 text-center text-gray-500 text-sm">
                    Nu am găsit rezultate pentru &quot;{query}&quot;
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar
