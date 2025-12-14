import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"

export const listBrands = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<HttpTypes.StoreProductCategoryListResponse> {
  return await sdk.client.fetch<any>(`/store/brands`, {
    method: "GET",
    query: {
      offset,
      limit,
    },
    cache: "force-cache",
  })
})


