import { HttpTypes } from "@medusajs/types"
import Hero from "@modules/home/components/hero"
import CategorySection from "@modules/home/components/category-section"
import SmartDealsSection from "@modules/home/components/smart-deals-section"
import CategorySidebar from "@modules/home/components/category-sidebar"
import CategoryCards from "@modules/home/components/category-cards"

type HomepageTemplateProps = {
  region: HttpTypes.StoreRegion
  categories: HttpTypes.StoreProductCategory[]
}

export default function HomepageTemplate({
  region,
  categories,
}: HomepageTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section: Sidebar + Banner */}
      <div className="content-container py-4">
        <div className="flex gap-4">
          {/* Category Sidebar - hidden on mobile */}
          <div className="hidden small:block w-[220px] flex-shrink-0">
            <CategorySidebar categories={categories} />
          </div>

          {/* Hero Banner */}
          <div className="flex-1 min-w-0">
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
        {/* Smart Deals Section */}
        <SmartDealsSection region={region} limit={20} />

        {/* Category-based sections */}
        {categories.slice(0, 4).map((category) => (
          <CategorySection
            key={category.id}
            title={category.name}
            categoryId={category.id}
            region={region}
            geniusDeal={true}
            href={`/categories/${category.handle}`}
          />
        ))}
      </div>
    </div>
  )
}
