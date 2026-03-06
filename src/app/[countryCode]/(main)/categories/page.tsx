import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import AllCategoriesTemplate from "@modules/categories/templates/all-categories"

export const metadata: Metadata = {
  title: "Categorii | Solidon",
  description: "Explorează toate categoriile de produse Solidon.",
}

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function CategoriesPage(props: Props) {
  const params = await props.params
  const categories = await listCategories()

  return (
    <AllCategoriesTemplate 
      categories={categories || []} 
      countryCode={params.countryCode}
    />
  )
}
