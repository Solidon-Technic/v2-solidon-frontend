import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

type StoreTemplateProps = {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  searchQuery?: string
  categoryIds?: string[]
  collectionIds?: string[]
  tagIds?: string[]
  typeIds?: string[]
  priceRanges?: string[]
  priceMin?: number
  priceMax?: number
  useCustomPriceInterval?: boolean
  inStockOnly?: boolean
  categories?: { id: string; name: string }[]
  collections?: { id: string; title: string }[]
  tags?: { id: string; value: string }[]
  productTypes?: { id: string; value: string }[]
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  searchQuery,
  categoryIds = [],
  collectionIds = [],
  tagIds = [],
  typeIds = [],
  priceRanges = [],
  priceMin,
  priceMax,
  useCustomPriceInterval = false,
  inStockOnly = false,
  categories = [],
  collections = [],
  tags = [],
  productTypes = [],
}: StoreTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start gap-8 small:gap-0 py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        categories={categories}
        collections={collections}
        tags={tags}
        productTypes={productTypes}
        categoryIds={categoryIds}
        collectionIds={collectionIds}
        tagIds={tagIds}
        typeIds={typeIds}
        priceRanges={priceRanges}
        priceMin={priceMin}
        priceMax={priceMax}
        useCustomPriceInterval={useCustomPriceInterval}
        inStockOnly={inStockOnly}
      />
      <div className="w-full min-w-0">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">
            {searchQuery ? `Rezultate pentru "${searchQuery}"` : "Toate Produsele"}
          </h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            searchQuery={searchQuery}
            categoryIds={categoryIds}
            collectionIds={collectionIds}
            tagIds={tagIds}
            typeIds={typeIds}
            priceRanges={priceRanges}
            priceMin={priceMin}
            priceMax={priceMax}
            useCustomPriceInterval={useCustomPriceInterval}
            inStockOnly={inStockOnly}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
