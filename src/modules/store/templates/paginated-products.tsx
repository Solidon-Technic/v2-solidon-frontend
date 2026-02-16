import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  tag_id?: string[]
  type_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionIds,
  categoryIds,
  tagIds,
  typeIds,
  productsIds,
  countryCode,
  searchQuery,
  priceRanges,
  priceMin,
  priceMax,
  useCustomPriceInterval,
  inStockOnly,
}: {
  sortBy?: SortOptions
  page: number
  collectionIds?: string[]
  categoryIds?: string[]
  tagIds?: string[]
  typeIds?: string[]
  productsIds?: string[]
  countryCode: string
  searchQuery?: string
  priceRanges?: string[]
  priceMin?: number
  priceMax?: number
  useCustomPriceInterval?: boolean
  inStockOnly?: boolean
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionIds?.length) {
    queryParams["collection_id"] = collectionIds
  }

  if (categoryIds?.length) {
    queryParams["category_id"] = categoryIds
  }

  if (productsIds?.length) {
    queryParams["id"] = productsIds
  }

  if (tagIds?.length) {
    queryParams["tag_id"] = tagIds
  }

  if (typeIds?.length) {
    queryParams["type_id"] = typeIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (searchQuery) {
    ;(queryParams as any)["q"] = searchQuery
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    priceRanges,
    priceMin,
    priceMax,
    useCustomPriceInterval,
    inStockOnly,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (products.length === 0 && searchQuery) {
    return (
      <p className="text-gray-500 py-10 text-center">
        Nu am găsit produse pentru &quot;{searchQuery}&quot;.
      </p>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
