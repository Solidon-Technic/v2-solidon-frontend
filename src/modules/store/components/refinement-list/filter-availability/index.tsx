"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

type FilterAvailabilityProps = {
  availability: string
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const availabilityOptions = [
  {
    value: "all",
    label: "All Products",
  },
  {
    value: "in_stock",
    label: "In Stock",
  },
  {
    value: "out_of_stock",
    label: "Out of Stock",
  },
]

const FilterAvailability = ({
  availability,
  setQueryParams,
  "data-testid": dataTestId,
}: FilterAvailabilityProps) => {
  const handleChange = (value: string) => {
    setQueryParams("availability", value)
  }

  return (
    <FilterRadioGroup
      title="Availability"
      items={availabilityOptions}
      value={availability}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default FilterAvailability


