import { Metadata } from "next"

import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProductTags } from "@lib/data/tags"
import { listProductTypes } from "@lib/data/product-types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
    category?: string | string[]
    collection?: string | string[]
    tag?: string | string[]
    type?: string | string[]
    price_range?: string
    price_min?: string
    price_max?: string
    price_interval?: string
    in_stock?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

function getMultiParam(
  params: Record<string, string | string[] | undefined>,
  key: string
): string[] {
  const v = params[key]
  if (!v) return []
  const str = Array.isArray(v) ? v.join(",") : v
  return str ? str.split(",").filter(Boolean) : []
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, q } = searchParams

  const categoryIds = getMultiParam(searchParams, "category")
  const collectionIds = getMultiParam(searchParams, "collection")
  const tagIds = getMultiParam(searchParams, "tag")
  const typeIds = getMultiParam(searchParams, "type")
  const priceRanges = getMultiParam(searchParams, "price_range")
  const priceMin = searchParams.price_min
    ? parseInt(String(searchParams.price_min), 10)
    : undefined
  const priceMax = searchParams.price_max
    ? parseInt(String(searchParams.price_max), 10)
    : undefined
  const useCustomPriceInterval =
    searchParams.price_interval === "1"
  const inStockOnly = searchParams.in_stock === "1"

  const [categories, collectionsResult, tags, productTypes] = await Promise.all([
    listCategories({ limit: 100 }),
    listCollections({ limit: "100" }),
    listProductTags(100),
    listProductTypes(100),
  ])

  const collections = collectionsResult.collections || []

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      searchQuery={q}
      categoryIds={categoryIds}
      collectionIds={collectionIds}
      tagIds={tagIds}
      typeIds={typeIds}
      priceRanges={priceRanges}
      priceMin={priceMin}
      priceMax={priceMax}
      useCustomPriceInterval={useCustomPriceInterval}
      inStockOnly={inStockOnly}
      categories={categories}
      collections={collections}
      tags={tags}
      productTypes={productTypes}
    />
  )
}
