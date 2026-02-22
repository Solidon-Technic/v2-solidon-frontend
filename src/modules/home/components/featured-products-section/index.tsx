import { HttpTypes } from "@medusajs/types"
import { getProductsByIds } from "@lib/data/products"
import SwiperCarousel from "../product-carousel/swiper-carousel"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "@medusajs/icons"

type FeaturedProductsSectionProps = {
  productIds: string[]
  region: HttpTypes.StoreRegion
  title?: string
}

export default async function FeaturedProductsSection({
  productIds,
  region,
  title = "Produse recomandate",
}: FeaturedProductsSectionProps) {
  if (!productIds || productIds.length === 0) {
    return null
  }

  const products = await getProductsByIds({
    productIds,
    regionId: region.id,
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <LocalizedClientLink
          href="/store/promotia-actuala"
          className="text-sm font-semibold text-space_indigo hover:underline flex items-center gap-1 shrink-0"
        >
          Vezi toate
          <ChevronRight className="w-4 h-4" />
        </LocalizedClientLink>
      </div>
      <SwiperCarousel
        breakpoints={{ mobile: 2, tablet: 3, desktop: 5 }}
        gap={16}
        infiniteScroll={true}
        variant="products"
      >
        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            region={region}
          />
        ))}
      </SwiperCarousel>
    </section>
  )
}
