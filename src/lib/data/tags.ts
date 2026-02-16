"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type StoreProductTag = {
  id: string
  value: string
}

export const listProductTags = async (
  limit = 100
): Promise<StoreProductTag[]> => {
  const next = await getCacheOptions("tags")

  const data = await sdk.client.fetch<{
    product_tags: { id: string; value: string }[]
  }>("/store/product-tags", {
    query: { limit },
    next,
    cache: "force-cache",
  })

  return data?.product_tags || []
}
