import { HttpTypes } from "@medusajs/types";
import { getProductPrice } from "./get-product-price";

/**
 * Filters products to only include those with active discounts/sales
 */
export function filterDiscountedProducts(
    products: HttpTypes.StoreProduct[]
): HttpTypes.StoreProduct[] {
    return products.filter((product) => {
        const { cheapestPrice } = getProductPrice({ product });
        return (
            cheapestPrice?.price_type === "sale" &&
            cheapestPrice?.percentage_diff
        );
    });
}

/**
 * Checks if a product has a discount
 */
export function hasDiscount(product: HttpTypes.StoreProduct): boolean {
    const { cheapestPrice } = getProductPrice({ product });
    return (
        cheapestPrice?.price_type === "sale" &&
        !!cheapestPrice?.percentage_diff
    );
}

