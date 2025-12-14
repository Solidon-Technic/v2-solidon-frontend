import { Metadata } from "next"

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
    categories?: string
    collections?: string
    productTypes?: string
    priceRange?: string
    q?: string
    availability?: string
    brands?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, categories, collections, productTypes, priceRange, q, availability, brands } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      categories={categories}
      collections={collections}
      productTypes={productTypes}
      priceRange={priceRange}
      searchQuery={q}
      availability={availability}
      brands={brands}
    />
  )
}
