"use client"

import { Checkbox } from "@medusajs/ui"
import { useCallback } from "react"

type FilterBrandsProps = {
  brands: { id: string; name: string }[]
  selectedBrands?: string[]
  setQueryParams: (name: string, value: string | string[]) => void
}

const FilterBrands = ({
  brands,
  selectedBrands = [],
  setQueryParams,
}: FilterBrandsProps) => {
  const handleBrandChange = useCallback(
    (brandId: string, checked: boolean) => {
      const updatedBrands = checked
        ? [...selectedBrands, brandId]
        : selectedBrands.filter((id) => id !== brandId)

      setQueryParams("brands", updatedBrands)
    },
    [selectedBrands, setQueryParams]
  )

  return (
    <div className="flex flex-col gap-y-3">
      <span className="txt-compact-small-plus">Brands</span>
      <div className="flex flex-col gap-y-2">
        {brands && brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand.id, checked === true)
                }
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="txt-compact-small cursor-pointer"
              >
                {brand.name}
              </label>
            </div>
          ))
        ) : (
          <span className="txt-compact-small text-ui-fg-muted">
            No brands available
          </span>
        )}
      </div>
    </div>
  )
}

export default FilterBrands


