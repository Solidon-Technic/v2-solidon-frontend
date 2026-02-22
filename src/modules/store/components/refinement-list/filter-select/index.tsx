"use client"

import { Text } from "@medusajs/ui"
import NativeSelect from "@modules/common/components/native-select"

type FilterSelectProps = {
  title: string
  items: { id: string; label: string }[]
  value: string
  paramName: string
  onSelect: (paramName: string, value: string) => void
}

const FilterSelect = ({
  title,
  items,
  value,
  paramName,
  onSelect,
}: FilterSelectProps) => {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-y-3">
      <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
      <NativeSelect
        value={value}
        onChange={(e) => {
          const v = e.target.value
          onSelect(paramName, v)
        }}
        className="w-full"
      >
        <option value="">Toate</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </NativeSelect>
    </div>
  )
}

export default FilterSelect
