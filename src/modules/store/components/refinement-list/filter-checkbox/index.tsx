"use client"

import { ChevronUpMini, ChevronDownMini } from "@medusajs/icons"
import { Checkbox, Text, clx } from "@medusajs/ui"
import { useState } from "react"

type FilterCheckboxProps = {
  title: string
  items: { id: string; label: string }[]
  selectedIds: string[]
  paramName: string
  onToggle: (paramName: string, ids: string[]) => void
  defaultOpen?: boolean
}

const FilterCheckbox = ({
  title,
  items,
  selectedIds,
  paramName,
  onToggle,
  defaultOpen = false,
}: FilterCheckboxProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  if (items.length === 0) return null

  const handleToggle = (id: string, checked: boolean) => {
    const next = checked
      ? [...selectedIds, id]
      : selectedIds.filter((x) => x !== id)
    onToggle(paramName, next)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-primary-700 transition-colors"
      >
        <Text className="txt-compact-small-plus font-semibold text-primary-600">
          {title}
        </Text>
        {isOpen ? (
          <ChevronUpMini className="w-4 h-4 text-primary-600 shrink-0" />
        ) : (
          <ChevronDownMini className="w-4 h-4 text-primary-600 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pt-1 space-y-1 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <label
              key={item.id}
              className={clx(
                "flex items-center gap-3 py-1.5 cursor-pointer",
                "hover:text-ui-fg-base transition-colors"
              )}
            >
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleToggle(item.id, checked === true)
                }
              />
              <Text className="txt-compact-small text-ui-fg-base cursor-pointer flex-1">
                {item.label}
              </Text>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterCheckbox
