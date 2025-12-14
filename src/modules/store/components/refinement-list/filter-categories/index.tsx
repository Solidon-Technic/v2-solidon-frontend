"use client"

import { HttpTypes } from "@medusajs/types"
import { Checkbox, Label, Text } from "@medusajs/ui"

type FilterCategoriesProps = {
  categories: HttpTypes.StoreProductCategory[]
  selectedCategories: string[]
  setQueryParams: (name: string, value: string[]) => void
  "data-testid"?: string
}

const FilterCategories = ({
  categories,
  selectedCategories,
  setQueryParams,
  "data-testid": dataTestId,
}: FilterCategoriesProps) => {
  const handleChange = (categoryId: string, checked: boolean) => {
    let newCategories: string[]
    if (checked) {
      newCategories = [...selectedCategories, categoryId]
    } else {
      newCategories = selectedCategories.filter((id) => id !== categoryId)
    }
    setQueryParams("categories", newCategories)
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-muted">Categories</Text>
      <div className="flex flex-col gap-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => 
                handleChange(category.id, checked === true)
              }
            />
            <Label
              htmlFor={`category-${category.id}`}
              className="!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterCategories

