"use client"

import { MagnifyingGlass } from "@medusajs/icons"
import { Input, Text } from "@medusajs/ui"
import { useState, useEffect, useRef } from "react"

type FilterSearchProps = {
  searchQuery: string
  setQueryParams: (name: string, value: string) => void
  showLabel?: boolean
  "data-testid"?: string
}

const FilterSearch = ({
  searchQuery,
  setQueryParams,
  showLabel = true,
  "data-testid": dataTestId,
}: FilterSearchProps) => {
  const [localValue, setLocalValue] = useState(searchQuery)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLocalValue(searchQuery)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryParams("q", localValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalValue(value)
    
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    // Auto-search after user stops typing for 500ms
    timerRef.current = setTimeout(() => {
      setQueryParams("q", value)
    }, 500)
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3" data-testid={dataTestId}>
      {showLabel && <Text className="txt-compact-small-plus text-ui-fg-muted">Search</Text>}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={localValue}
            onChange={handleChange}
            className="w-full pr-8"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ui-fg-muted hover:text-ui-fg-base"
          >
            <MagnifyingGlass />
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterSearch

