import { Metadata } from "next"

import { listCategories } from "@lib/data/categories"
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

  const region = await getRegion(countryCode)

  const categories = await listCategories({
    limit: 10,
    fields: "id, name, handle, metadata, *parent_category",
  })

  if (!region) {
    return null
  }

  return <HomepageTemplate region={region} categories={categories || []} />
}
