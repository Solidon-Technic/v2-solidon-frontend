import { HttpTypes } from "@medusajs/types";
import Hero from "@modules/home/components/hero";
import CategorySection from "@modules/home/components/category-section";
import SmartDealsSection from "@modules/home/components/smart-deals-section";

type HomepageTemplateProps = {
    region: HttpTypes.StoreRegion;
    categories: HttpTypes.StoreProductCategory[];
};

export default function HomepageTemplate({
    region,
    categories,
}: HomepageTemplateProps) {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Hero />

            {/* Main Content */}
            <div className="content-container py-8">
                {/* Smart Deals Section - Only Discounted Products */}
                <SmartDealsSection region={region} limit={20} />

                {/* Category-based sections */}
                {categories.slice(0, 4).map((category) => (
                    <CategorySection
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        region={region}
                        showSaleBadge={true}
                        href={`/categories/${category.handle}`}
                    />
                ))}
            </div>
        </div>
    );
}
