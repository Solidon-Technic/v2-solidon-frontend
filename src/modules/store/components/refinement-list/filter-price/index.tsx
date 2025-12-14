"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

type FilterPriceProps = {
  priceRange: string
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const priceRanges = [
  {
    value: "all",
    label: "All Prices",
  },
  {
    value: "0-50",
    label: "Under 50 RON",
  },
  {
    value: "50-100",
    label: "50 - 100 RON",
  },
  {
    value: "100-200",
    label: "100 - 200 RON",
  },
  {
    value: "200+",
    label: "Over 200 RON",
  },
]

const FilterPrice = ({
  priceRange,
  setQueryParams,
  "data-testid": dataTestId,
}: FilterPriceProps) => {
  const handleChange = (value: string) => {
    setQueryParams("priceRange", value)
  }

  return (
    <FilterRadioGroup
      title="Price Range"
      items={priceRanges}
      value={priceRange}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default FilterPrice


