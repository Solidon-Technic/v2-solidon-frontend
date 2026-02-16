"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import FilterCheckbox from "./filter-checkbox"
import FilterPrice from "./filter-price"
import FilterAvailability from "./filter-availability"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: { id: string; name: string }[]
  collections?: { id: string; title: string }[]
  tags?: { id: string; value: string }[]
  productTypes?: { id: string; value: string }[]
  categoryIds?: string[]
  collectionIds?: string[]
  tagIds?: string[]
  typeIds?: string[]
  priceRanges?: string[]
  priceMin?: number
  priceMax?: number
  useCustomPriceInterval?: boolean
  inStockOnly?: boolean
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  categories = [],
  collections = [],
  tags = [],
  productTypes = [],
  categoryIds = [],
  collectionIds = [],
  tagIds = [],
  typeIds = [],
  priceRanges = [],
  priceMin,
  priceMax,
  useCustomPriceInterval = false,
  inStockOnly = false,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setPriceParams = useCallback(
    (updates: {
      ranges?: string[]
      useCustom?: boolean
      min?: number
      max?: number
    }) => {
      const params = new URLSearchParams(searchParams)
      params.delete("page")
      if (updates.useCustom && updates.min !== undefined && updates.max !== undefined) {
        params.delete("price_range")
        params.set("price_interval", "1")
        params.set("price_min", String(updates.min))
        params.set("price_max", String(updates.max))
      } else if (updates.ranges && updates.ranges.length > 0) {
        params.delete("price_interval")
        params.delete("price_min")
        params.delete("price_max")
        params.set("price_range", updates.ranges.join(","))
      } else if (updates.useCustom === false || (updates.ranges && updates.ranges.length === 0)) {
        params.delete("price_range")
        params.delete("price_interval")
        params.delete("price_min")
        params.delete("price_max")
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const setMultiFilter = useCallback(
    (name: string, ids: string[]) => {
      const params = new URLSearchParams(searchParams)
      params.delete(name)
      params.delete("page")
      if (ids.length > 0) {
        params.set(name, ids.join(","))
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const setInStockOnly = useCallback(
    (checked: boolean) => {
      const params = new URLSearchParams(searchParams)
      params.delete("page")
      if (checked) {
        params.set("in_stock", "1")
      } else {
        params.delete("in_stock")
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const setQueryParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  return (
    <aside className="w-full small:w-[280px] small:shrink-0 small:pr-8 small:border-r small:border-ui-border-base small:mr-8">
      <div className="flex flex-col gap-6">
        <div>
          <SortProducts
            sortBy={sortBy}
            setQueryParams={(name, value) => setQueryParams(name, value)}
            data-testid={dataTestId}
          />
        </div>
        <FilterCheckbox
          title="Categorie"
          items={categories.map((c) => ({ id: c.id, label: c.name }))}
          selectedIds={categoryIds}
          paramName="category"
          onToggle={setMultiFilter}
          defaultOpen={false}
        />
        <FilterCheckbox
          title="Colecție"
          items={collections.map((c) => ({ id: c.id, label: c.title }))}
          selectedIds={collectionIds}
          paramName="collection"
          onToggle={setMultiFilter}
        />
        <FilterCheckbox
          title="Tag"
          items={tags.map((t) => ({ id: t.id, label: t.value }))}
          selectedIds={tagIds}
          paramName="tag"
          onToggle={setMultiFilter}
        />
        <FilterCheckbox
          title="Tip produs"
          items={productTypes.map((t) => ({ id: t.id, label: t.value }))}
          selectedIds={typeIds}
          paramName="type"
          onToggle={setMultiFilter}
          defaultOpen={false}
        />
        <FilterPrice
          selectedRanges={priceRanges}
          priceMin={priceMin}
          priceMax={priceMax}
          useCustomInterval={useCustomPriceInterval}
          onRangesChange={(ranges) =>
            setPriceParams({ ranges, useCustom: false })
          }
          onCustomIntervalChange={(min, max) =>
            setPriceParams({ useCustom: true, min, max })
          }
          onUseCustomIntervalChange={(use) =>
            !use && setPriceParams({ ranges: [] })
          }
        />
        <FilterAvailability
          inStockOnly={inStockOnly}
          onToggle={setInStockOnly}
        />
      </div>
    </aside>
  )
}

export default RefinementList
