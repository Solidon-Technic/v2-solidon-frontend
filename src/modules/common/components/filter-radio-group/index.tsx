"use client"

import { ChevronUpMini, ChevronDownMini, EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { useState } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  collapsible?: boolean
  defaultOpen?: boolean
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  collapsible = false,
  defaultOpen = false,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const radioContent = (
    <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-x-2 items-center", {
              "ml-[-23px]": i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": i.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
    </RadioGroup>
  )

  if (collapsible) {
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
        {isOpen && <div className="pt-1 space-y-1">{radioContent}</div>}
      </div>
    )
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className="txt-compact-small-plus font-semibold text-primary-600">{title}</Text>
      {radioContent}
    </div>
  )
}

export default FilterRadioGroup
