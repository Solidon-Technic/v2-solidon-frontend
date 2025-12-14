"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import FilterSearch from "../refinement-list/filter-search"

type StoreHeaderProps = {
  searchQuery: string
}

const StoreHeader = ({ searchQuery }: StoreHeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams)
      
      if (Array.isArray(value)) {
        params.delete(name)
        if (value.length > 0) {
          params.set(name, value.join(","))
        }
      } else {
        if (value === "" || value === "all") {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      }

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string | string[]) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  return (
    <div className="flex items-center mb-8 gap-8">
      <h1 className="text-2xl-semi whitespace-nowrap" data-testid="store-page-title">
        All products
      </h1>
      <div className="w-full max-w-md">
        <FilterSearch 
          searchQuery={searchQuery} 
          setQueryParams={setQueryParams}
          showLabel={false}
        />
      </div>
    </div>
  )
}

export default StoreHeader

