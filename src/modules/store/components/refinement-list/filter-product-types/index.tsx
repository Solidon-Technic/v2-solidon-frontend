"use client"

import { HttpTypes } from "@medusajs/types"
import { Checkbox, Label, Text } from "@medusajs/ui"

type FilterProductTypesProps = {
  productTypes: HttpTypes.StoreProductType[]
  selectedTypes: string[]
  setQueryParams: (name: string, value: string[]) => void
  "data-testid"?: string
}

const FilterProductTypes = ({
  productTypes,
  selectedTypes,
  setQueryParams,
  "data-testid": dataTestId,
}: FilterProductTypesProps) => {
  const handleChange = (typeId: string, checked: boolean) => {
    let newTypes: string[]
    if (checked) {
      newTypes = [...selectedTypes, typeId]
    } else {
      newTypes = selectedTypes.filter((id) => id !== typeId)
    }
    setQueryParams("productTypes", newTypes)
  }

  if (productTypes.length === 0) {
    return null
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-muted">Product Types</Text>
      <div className="flex flex-col gap-y-2">
        {productTypes.map((type) => (
          <div key={type.id} className="flex items-center gap-x-2">
            <Checkbox
              id={`type-${type.id}`}
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={(checked) => 
                handleChange(type.id, checked === true)
              }
            />
            <Label
              htmlFor={`type-${type.id}`}
              className="!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer"
            >
              {type.value}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterProductTypes


