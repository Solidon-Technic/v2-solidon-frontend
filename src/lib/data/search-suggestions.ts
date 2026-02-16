"use server"

import { HttpTypes } from "@medusajs/types"
import { listCategories } from "./categories"
import { listProducts } from "./products"

export type SearchSuggestionsResult = {
  products: HttpTypes.StoreProduct[]
  categories: HttpTypes.StoreProductCategory[]
}

export async function searchSuggestions(
  query: string,
  countryCode: string
): Promise<SearchSuggestionsResult> {
  const trimmed = query.trim()
  if (trimmed.length < 2) {
    return { products: [], categories: [] }
  }

  const [productsResult, categories] = await Promise.all([
    listProducts({
      pageParam: 1,
      queryParams: { q: trimmed, limit: 6 },
      countryCode,
    }),
    listCategories({ q: trimmed, limit: 4 }),
  ])

  return {
    products: productsResult.response.products,
    categories: categories || [],
  }
}
