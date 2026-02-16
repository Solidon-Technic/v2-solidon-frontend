import { Metadata } from "next"

import { listCategories } from "@lib/data/categories"
import { getLandingPageConfig } from "@lib/data/landing-page"
import { getRegion } from "@lib/data/regions"
import HomepageTemplate from "@modules/home/templates/homepage"

export const metadata: Metadata = {
  title: "Solidon - Termopane Magice",
  description:
    "Cele mai bune termopane de pe piata.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const [region, categories, landingConfig] = await Promise.all([
    getRegion(countryCode),
    listCategories({
      limit: 100,
      fields: "id, name, handle, metadata, *parent_category",
    }),
    getLandingPageConfig(),
  ])

  if (!region) {
    return null
  }

  return (
    <HomepageTemplate
      region={region}
      categories={categories || []}
      landingConfig={landingConfig}
    />
  )
}
