import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCollections = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[] }>(
      "/store/collections",
      {
        query: {
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ collections }) => collections)
}

export const getCollectionByHandle = async (collectionHandle: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionResponse>(
      `/store/collections`,
      {
        query: {
          handle: collectionHandle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection)
}
