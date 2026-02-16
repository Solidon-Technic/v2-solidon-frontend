"use client"

import { ChevronUpMini, ChevronDownMini, ChevronRightMini } from "@medusajs/icons"
import { Checkbox, Input, Text, clx } from "@medusajs/ui"
import { useState, useCallback, useEffect } from "react"
import { Slider } from "../../../../../components/ui/slider"

/** Prețurile sunt în RON. Medusa v2 stochează în unități majore (50 = 50 RON). */
const PRICE_RANGES = [
  { id: "sub50", label: "Sub 50", min: 0, max: 50 },
  { id: "50-100", label: "50 - 100", min: 50, max: 100 },
  { id: "100-200", label: "100 - 200", min: 100, max: 200 },
  { id: "200-500", label: "200 - 500", min: 200, max: 500 },
  { id: "500-1000", label: "500 - 1.000", min: 500, max: 1000 },
  { id: "1000-1500", label: "1.000 - 1.500", min: 1000, max: 1500 },
  { id: "1500-2000", label: "1.500 - 2.000", min: 1500, max: 2000 },
  { id: "2000-3000", label: "2.000 - 3.000", min: 2000, max: 3000 },
] as const

const SLIDER_MAX = 10000

type FilterPriceProps = {
  selectedRanges: string[]
  priceMin?: number
  priceMax?: number
  useCustomInterval: boolean
  onRangesChange: (ranges: string[]) => void
  onCustomIntervalChange: (min: number, max: number) => void
  onUseCustomIntervalChange: (use: boolean) => void
}

const FilterPrice = ({
  selectedRanges,
  priceMin = 0,
  priceMax = SLIDER_MAX,
  useCustomInterval,
  onRangesChange,
  onCustomIntervalChange,
  onUseCustomIntervalChange,
}: FilterPriceProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    priceMin,
    priceMax,
  ])
  const [inputMin, setInputMin] = useState(String(priceMin))
  const [inputMax, setInputMax] = useState(String(priceMax))

  useEffect(() => {
    setSliderValue([priceMin, priceMax])
    setInputMin(String(priceMin))
    setInputMax(String(priceMax))
  }, [priceMin, priceMax])

  const handleRangeToggle = useCallback(
    (id: string, checked: boolean) => {
      const next = checked
        ? [...selectedRanges, id]
        : selectedRanges.filter((x) => x !== id)
      onRangesChange(next)
      if (checked) onUseCustomIntervalChange(false)
    },
    [selectedRanges, onRangesChange, onUseCustomIntervalChange]
  )

  const handleCustomCheckbox = useCallback(
    (checked: boolean) => {
      onUseCustomIntervalChange(checked)
      if (checked) {
        onRangesChange([])
        onCustomIntervalChange(sliderValue[0], sliderValue[1])
      }
    },
    [
      onUseCustomIntervalChange,
      onRangesChange,
      onCustomIntervalChange,
      sliderValue,
    ]
  )

  const handleSliderChange = useCallback(
    (value: number[]) => {
      const [min, max] = value
      setSliderValue([min, max])
      setInputMin(String(min))
      setInputMax(String(max))
      onCustomIntervalChange(min, max)
    },
    [onCustomIntervalChange]
  )

  const handleInputBlur = useCallback(() => {
    const min = Math.max(0, Math.min(SLIDER_MAX, parseInt(inputMin, 10) || 0))
    const max = Math.max(
      min,
      Math.min(SLIDER_MAX, parseInt(inputMax, 10) || SLIDER_MAX)
    )
    setSliderValue([min, max])
    setInputMin(String(min))
    setInputMax(String(max))
    onCustomIntervalChange(min, max)
  }, [inputMin, inputMax, onCustomIntervalChange])

  const handleApplyCustom = useCallback(() => {
    handleInputBlur()
  }, [handleInputBlur])

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-primary-700 transition-colors"
      >
        <Text className="txt-compact-small-plus font-semibold text-primary-600">
          Preț
        </Text>
        {isOpen ? (
          <ChevronUpMini className="w-4 h-4 text-primary-600 shrink-0" />
        ) : (
          <ChevronDownMini className="w-4 h-4 text-primary-600 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pt-1 space-y-3">
          {/* Intervale predefinite */}
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.id}
                className={clx(
                  "flex items-center gap-3 py-1.5 cursor-pointer",
                  "hover:text-ui-fg-base transition-colors"
                )}
              >
                <Checkbox
                  checked={
                    selectedRanges.includes(range.id) && !useCustomInterval
                  }
                  onCheckedChange={(checked) =>
                    handleRangeToggle(range.id, checked === true)
                  }
                  disabled={useCustomInterval}
                />
                <Text className="txt-compact-small text-ui-fg-base cursor-pointer flex-1">
                  {range.label}
                </Text>
              </label>
            ))}
          </div>

          <div className="border-t border-ui-border-base pt-3">
            {/* Interval custom */}
            <label
              className={clx(
                "flex items-center gap-3 py-1.5 cursor-pointer",
                "hover:text-ui-fg-base transition-colors"
              )}
            >
              <Checkbox
                checked={useCustomInterval}
                onCheckedChange={(checked) =>
                  handleCustomCheckbox(checked === true)
                }
              />
              <Text className="txt-compact-small text-ui-fg-base cursor-pointer">
                Interval preț
              </Text>
            </label>

            {useCustomInterval && (
              <div className="mt-3 space-y-3">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={0}
                  max={SLIDER_MAX}
                  step={10}
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={SLIDER_MAX}
                    value={inputMin}
                    onChange={(e) => setInputMin(e.target.value)}
                    onBlur={handleInputBlur}
                    className="h-8 w-20 text-sm"
                  />
                  <span className="text-ui-fg-muted">-</span>
                  <Input
                    type="number"
                    min={0}
                    max={SLIDER_MAX}
                    value={inputMax}
                    onChange={(e) => setInputMax(e.target.value)}
                    onBlur={handleInputBlur}
                    className="h-8 w-20 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustom}
                    className="p-1 rounded hover:bg-ui-bg-subtle text-ui-fg-muted hover:text-ui-fg-base"
                    aria-label="Aplică interval"
                  >
                    <ChevronRightMini className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPrice
