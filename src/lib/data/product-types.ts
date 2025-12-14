import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listProductTypes = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("product-types")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_types: HttpTypes.StoreProductType[] }>(
      "/store/product-types",
      {
        query: {
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_types }) => product_types)
}


