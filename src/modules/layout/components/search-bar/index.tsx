"use client"

import { useRouter, useParams } from "next/navigation"
import { FormEvent, useState } from "react"

const SearchBar = () => {
  const router = useRouter()
  const { countryCode } = useParams()
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="nav-search flex-1 max-w-2xl mx-4">
      <div className="relative flex items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută în milioane de produse..."
          className="w-full h-10 pl-4 pr-12 rounded-md bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dusty_grape"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-dusty_grape hover:bg-dusty_grape-600 rounded-r-md transition-colors"
          aria-label="Caută"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
