import { Metadata } from "next"
import { getLandingPageConfig } from "@lib/data/landing-page"
import { getProductsByIds } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

export const metadata: Metadata = {
  title: "Promotia actuala",
  description: "Produsele din promotia curenta.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function PromotiaActualaPage({ params }: Params) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const landingConfig = await getLandingPageConfig()
  const productIds = landingConfig.featured_product_ids || []

  if (productIds.length === 0) {
    return (
      <div className="content-container py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Promotia actuala
        </h1>
        <p className="text-gray-500">
          Nu exista produse in promotie momentan.
        </p>
      </div>
    )
  }

  const products = await getProductsByIds({
    productIds,
    regionId: region.id,
  })

  return (
    <div className="content-container py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Promotia actuala
      </h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Nu am gasit produse in promotie.</p>
      ) : (
        <ul
          className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
          data-testid="products-list"
        >
          {products.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
