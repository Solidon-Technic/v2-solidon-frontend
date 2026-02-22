import { sdk } from "@lib/config"

export type LandingPageConfig = {
  featured_product_ids: string[]
  featured_category_ids: string[]
}

export const getLandingPageConfig = async (): Promise<LandingPageConfig> => {
  try {
    const data = await sdk.client
      .fetch<LandingPageConfig>("/store/landing-page-config", {
        next: { revalidate: 60 },
      })
    return data || { featured_product_ids: [], featured_category_ids: [] }
  } catch {
    return { featured_product_ids: [], featured_category_ids: [] }
  }
}
