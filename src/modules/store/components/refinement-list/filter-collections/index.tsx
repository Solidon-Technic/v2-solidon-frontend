"use client"

import { HttpTypes } from "@medusajs/types"
import { Checkbox, Label, Text } from "@medusajs/ui"

type FilterCollectionsProps = {
  collections: HttpTypes.StoreCollection[]
  selectedCollections: string[]
  setQueryParams: (name: string, value: string[]) => void
  "data-testid"?: string
}

const FilterCollections = ({
  collections,
  selectedCollections,
  setQueryParams,
  "data-testid": dataTestId,
}: FilterCollectionsProps) => {
  const handleChange = (collectionId: string, checked: boolean) => {
    let newCollections: string[]
    if (checked) {
      newCollections = [...selectedCollections, collectionId]
    } else {
      newCollections = selectedCollections.filter((id) => id !== collectionId)
    }
    setQueryParams("collections", newCollections)
  }

  if (collections.length === 0) {
    return null
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-muted">Collections</Text>
      <div className="flex flex-col gap-y-2">
        {collections.map((collection) => (
          <div key={collection.id} className="flex items-center gap-x-2">
            <Checkbox
              id={`collection-${collection.id}`}
              checked={selectedCollections.includes(collection.id)}
              onCheckedChange={(checked) => 
                handleChange(collection.id, checked === true)
              }
            />
            <Label
              htmlFor={`collection-${collection.id}`}
              className="!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer"
            >
              {collection.title}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterCollections


