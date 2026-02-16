import { HttpTypes } from "@medusajs/types"
import type { LandingPageConfig } from "@lib/data/landing-page"
import Hero from "@modules/home/components/hero"
import CategorySection from "@modules/home/components/category-section"
import SmartDealsSection from "@modules/home/components/smart-deals-section"
import CategorySidebar from "@modules/home/components/category-sidebar"
import CategoryCards from "@modules/home/components/category-cards"
import FeaturedProductsSection from "@modules/home/components/featured-products-section"

type HomepageTemplateProps = {
  region: HttpTypes.StoreRegion
  categories: HttpTypes.StoreProductCategory[]
  landingConfig?: LandingPageConfig
}

export default function HomepageTemplate({
  region,
  categories,
  landingConfig = { featured_product_ids: [], featured_category_ids: [] },
}: HomepageTemplateProps) {
  const featuredCategoryIds = landingConfig.featured_category_ids || []
  const featuredProductIds = landingConfig.featured_product_ids || []

  const categoriesToShow =
    featuredCategoryIds.length > 0
      ? categories.filter((c) => featuredCategoryIds.includes(c.id))
      : categories.slice(0, 4)
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section: Sidebar + Banner */}
      <div className="content-container py-4">
        <div className="grid grid-cols-1 small:grid-cols-[220px_1fr] gap-4 items-stretch">
          {/* Category Sidebar - hidden on mobile */}
          <div className="hidden small:block h-full">
            <CategorySidebar categories={categories} />
          </div>

          {/* Hero Banner - Swiper + Benefits, same height as sidebar */}
          <div className="min-w-0 h-full flex flex-col">
            <Hero />
          </div>
        </div>
      </div>

      {/* Category Shop Cards */}
      <div className="content-container pb-6">
        <CategoryCards categories={categories} />
      </div>

      {/* Product Sections */}
      <div className="content-container py-4">
        {/* Featured Products (from admin selection) */}
        {featuredProductIds.length > 0 && (
          <FeaturedProductsSection
            productIds={featuredProductIds}
            region={region}
            title="Promotia actuala"
          />
        )}

        {/* Smart Deals Section */}
        <SmartDealsSection region={region} limit={20} />

        {/* Category-based sections */}
        {categoriesToShow.map((category) => (
          <CategorySection
            key={category.id}
            title={category.name}
            categoryId={category.id}
            region={region}
            href={`/categories/${category.handle}`}
          />
        ))}
      </div>
    </div>
  )
}
