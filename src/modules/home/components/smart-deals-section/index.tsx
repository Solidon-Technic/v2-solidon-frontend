import { HttpTypes } from "@medusajs/types";
import { listProducts } from "@lib/data/products";
import { filterDiscountedProducts } from "@lib/util/get-discounted-products";
import SwiperCarousel from "../product-carousel/swiper-carousel";
import ProductPreview from "@modules/products/components/product-preview";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { ChevronRight } from "@medusajs/icons";

type SmartDealsSectionProps = {
    region: HttpTypes.StoreRegion;
    limit?: number;
};

export default async function SmartDealsSection({
    region,
    limit = 20,
}: SmartDealsSectionProps) {
    // Fetch all products to filter for discounts
    const {
        response: { products: allProducts },
    } = await listProducts({
        regionId: region.id,
        queryParams: {
            fields: "*variants.calculated_price,+variants.inventory_quantity",
            limit,
        },
    });

    // Filter to only include discounted products
    const discountedProducts = filterDiscountedProducts(allProducts);

    if (!discountedProducts || discountedProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-8 relative">
            {/* Section Header - Centered with red text */}
            <div className="flex items-center justify-center mb-6 relative">
                <h2 className="text-3xl font-bold text-sales">Oferte Smart</h2>
                <LocalizedClientLink
                    href="/store"
                    className="absolute right-0 text-lg font-semibold text-sales hover:underline flex items-center gap-1"
                    aria-label="Vezi toate ofertele smart"
                >
                    <ChevronRight className="w-5 h-5" />
                </LocalizedClientLink>
            </div>

            {/* Products Carousel */}
            <SwiperCarousel
                breakpoints={{ mobile: 2, tablet: 3, desktop: 5 }}
                gap={16}
                infiniteScroll={true}
                variant="products"
            >
                {discountedProducts.map((product) => (
                    <ProductPreview
                        key={product.id}
                        product={product}
                        region={region}
                    />
                ))}
            </SwiperCarousel>
        </section>
    );
}

