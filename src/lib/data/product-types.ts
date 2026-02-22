"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type StoreProductType = {
  id: string
  value: string
}

export const listProductTypes = async (
  limit = 100
): Promise<StoreProductType[]> => {
  const next = await getCacheOptions("product-types")

  const data = await sdk.client.fetch<{
    product_types: { id: string; value: string }[]
  }>("/store/product-types", {
    query: { limit },
    next,
    cache: "force-cache",
  })

  return data?.product_types || []
}
