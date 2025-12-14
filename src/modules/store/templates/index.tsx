import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import StoreHeader from "@modules/store/components/store-header"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProductTypes } from "@lib/data/product-types"
import { listProducts } from "@lib/data/products"
import { listBrands } from "@lib/data/brands"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  categories,
  collections,
  productTypes,
  priceRange,
  searchQuery,
  availability,
  brands,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories?: string
  collections?: string
  productTypes?: string
  priceRange?: string
  searchQuery?: string
  availability?: string
  brands?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const selectedCategories = categories ? categories.split(",") : []
  const selectedCollections = collections ? collections.split(",") : []
  const selectedTypes = productTypes ? productTypes.split(",") : []
  const selectedBrands = brands ? brands.split(",") : []
  const price = priceRange || "all"
  const query = searchQuery || ""
  const stock = availability || "all"

  // Fetch categories on server-side
  const allCategories = await listCategories({ limit: 100 })
  // Filter only parent categories (categories without parent_category_id)
  const parentCategories = allCategories.filter((cat) => !cat.parent_category_id)

  // Fetch collections on server-side
  const allCollections = await listCollections({ limit: 100 })

  // Fetch product types on server-side
  const allProductTypes = await listProductTypes({ limit: 100 })

  // Fetch brands on server-side
  const allBrands = await listBrands({ limit: 100 })

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList 
        sortBy={sort}
        categories={parentCategories}
        selectedCategories={selectedCategories}
        collections={allCollections}
        selectedCollections={selectedCollections}
        productTypes={allProductTypes}
        selectedTypes={selectedTypes}
        brands={allBrands.brands || []}
        selectedBrands={selectedBrands}
        priceRange={price}
        searchQuery={query}
        availability={stock}
      />
      <div className="w-full">
        <StoreHeader searchQuery={query} />
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categories={selectedCategories}
            collections={selectedCollections}
            productTypes={selectedTypes}
            brands={selectedBrands}
            priceRange={price}
            searchQuery={query}
            availability={stock}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
