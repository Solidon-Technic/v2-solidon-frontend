"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"

import SortProducts, { SortOptions } from "./sort-products"
import FilterCategories from "./filter-categories"
import FilterPrice from "./filter-price"
import FilterAvailability from "./filter-availability"
import FilterCollections from "./filter-collections"
import FilterProductTypes from "./filter-product-types"
import FilterBrands from "./filter-brands"

type RefinementListProps = {
  sortBy: SortOptions
  categories: HttpTypes.StoreProductCategory[]
  selectedCategories: string[]
  collections: HttpTypes.StoreCollection[]
  selectedCollections: string[]
  productTypes: HttpTypes.StoreProductType[]
  selectedTypes: string[]
  brands: { id: string; name: string }[]
  selectedBrands: string[]
  priceRange: string
  searchQuery: string
  availability: string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ 
  sortBy, 
  categories,
  selectedCategories,
  collections,
  selectedCollections,
  productTypes,
  selectedTypes,
  brands,
  selectedBrands,
  priceRange,
  searchQuery,
  availability,
  'data-testid': dataTestId 
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams)
      
      if (Array.isArray(value)) {
        // For array values (like categories), remove old value and set new ones
        params.delete(name)
        if (value.length > 0) {
          params.set(name, value.join(","))
        }
      } else {
        // For single values
        if (value === "" || value === "all") {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      }

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string | string[]) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <FilterCategories 
        categories={categories}
        selectedCategories={selectedCategories}
        setQueryParams={setQueryParams}
        data-testid={dataTestId ? `${dataTestId}-categories` : undefined}
      />
      <FilterCollections 
        collections={collections}
        selectedCollections={selectedCollections}
        setQueryParams={setQueryParams}
        data-testid={dataTestId ? `${dataTestId}-collections` : undefined}
      />
      <FilterProductTypes 
        productTypes={productTypes}
        selectedTypes={selectedTypes}
        setQueryParams={setQueryParams}
        data-testid={dataTestId ? `${dataTestId}-types` : undefined}
      />
      <FilterBrands 
        brands={brands}
        selectedBrands={selectedBrands}
        setQueryParams={setQueryParams}
      />
      <FilterPrice 
        priceRange={priceRange}
        setQueryParams={setQueryParams}
        data-testid={dataTestId ? `${dataTestId}-price` : undefined}
      />
      <FilterAvailability 
        availability={availability}
        setQueryParams={setQueryParams}
        data-testid={dataTestId ? `${dataTestId}-availability` : undefined}
      />
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
    </div>
  )
}

export default RefinementList
