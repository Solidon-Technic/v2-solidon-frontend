import { HttpTypes } from "@medusajs/types";
import { listProducts } from "@lib/data/products";
import ResponsiveCarousel from "../product-carousel/responsive";
import ProductCard from "../product-card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { ChevronRight } from "@medusajs/icons";

type CategorySectionProps = {
    title: string;
    categoryId?: string;
    collectionId?: string;
    region: HttpTypes.StoreRegion;
    showSaleBadge?: boolean;
    geniusDeal?: boolean;
    href?: string;
    isSmartDeals?: boolean;
};

export default async function CategorySection({
    title,
    categoryId,
    collectionId,
    region,
    showSaleBadge = false,
    geniusDeal = false,
    href,
    isSmartDeals = false,
}: CategorySectionProps) {
    const queryParams: any = {
        fields: "*variants.calculated_price,+variants.inventory_quantity",
        limit: 12,
    };

    if (categoryId) {
        queryParams.category_id = [categoryId];
    }

    if (collectionId) {
        queryParams.collection_id = [collectionId];
    }

    const {
        response: { products },
    } = await listProducts({
        regionId: region.id,
        queryParams,
    });

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            {/* Section Header */}
            <div
                className={
                    isSmartDeals
                        ? "flex items-center justify-center mb-6"
                        : "flex items-center justify-between mb-6"
                }
            >
                <h2
                    className={
                        isSmartDeals
                            ? "text-3xl font-bold text-sales flex items-center gap-3"
                            : "text-2xl font-bold text-gray-900 flex items-center gap-2"
                    }
                >
                    {title}
                    {href && !isSmartDeals && (
                        <LocalizedClientLink
                            href={href}
                            className="text-sm font-normal text-space_indigo hover:underline flex items-center gap-1"
                        >
                            Vezi toate
                            <ChevronRight className="w-4 h-4" />
                        </LocalizedClientLink>
                    )}
                </h2>
                {href && isSmartDeals && (
                    <LocalizedClientLink
                        href={href}
                        className="text-lg font-semibold text-sales hover:underline flex items-center gap-1 absolute right-0"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </LocalizedClientLink>
                )}
            </div>

            {/* Products Carousel */}
            <ResponsiveCarousel
                breakpoints={{ mobile: 2, tablet: 3, desktop: 5 }}
                gap={16}
                showDots={true}
                infiniteScroll={true}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        showBadge={showSaleBadge}
                        geniusDeal={geniusDeal}
                    />
                ))}
            </ResponsiveCarousel>
        </section>
    );
}

