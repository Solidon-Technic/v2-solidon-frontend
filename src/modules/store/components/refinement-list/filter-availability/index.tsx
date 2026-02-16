"use client"

import { ChevronUpMini, ChevronDownMini } from "@medusajs/icons"
import { Checkbox, Text } from "@medusajs/ui"
import { useState } from "react"

type FilterAvailabilityProps = {
  inStockOnly: boolean
  onToggle: (checked: boolean) => void
}

const FilterAvailability = ({
  inStockOnly,
  onToggle,
}: FilterAvailabilityProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-primary-700 transition-colors"
      >
        <Text className="txt-compact-small-plus font-semibold text-primary-600">
          Disponibilitate
        </Text>
        {isOpen ? (
          <ChevronUpMini className="w-4 h-4 text-primary-600 shrink-0" />
        ) : (
          <ChevronDownMini className="w-4 h-4 text-primary-600 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pt-1 space-y-1">
          <label
            className="flex items-center gap-3 py-1.5 cursor-pointer hover:text-ui-fg-base transition-colors"
          >
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(checked) => onToggle(checked === true)}
            />
            <Text className="txt-compact-small text-ui-fg-base cursor-pointer flex-1">
              In stoc
            </Text>
          </label>
        </div>
      )}
    </div>
  )
}

export default FilterAvailability
