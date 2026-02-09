import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { filterDiscountedProducts } from "@lib/util/get-discounted-products"
import ProductPreview from "@modules/products/components/product-preview"

export const metadata: Metadata = {
  title: "Oferte - Solidon",
  description: "Cele mai bune oferte și promoții.",
}

export default async function OfertePage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    pageParam: 1,
    queryParams: { limit: 100 },
    countryCode,
  })

  const discountedProducts = filterDiscountedProducts(products)

  return (
    <div className="content-container py-8">
      <h1 className="text-2xl-semi mb-8">Oferte</h1>
      {discountedProducts.length === 0 ? (
        <p className="text-gray-500 py-10 text-center">
          Fara promotii momentan.
        </p>
      ) : (
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {discountedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
