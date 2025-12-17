import { listProductsWithSort } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import ProductPreview from "@modules/products/components/product-preview";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
    limit: number;
    collection_id?: string[];
    category_id?: string[];
    type_id?: string[];
    id?: string[];
    order?: string;
    q?: string;
};

export default async function PaginatedProducts({
    sortBy,
    page,
    collectionId,
    categoryId,
    productsIds,
    countryCode,
    categories,
    collections,
    productTypes,
    brands,
    priceRange,
    searchQuery,
    availability,
}: {
    sortBy?: SortOptions;
    page: number;
    collectionId?: string;
    categoryId?: string;
    productsIds?: string[];
    countryCode: string;
    categories?: string[];
    collections?: string[];
    productTypes?: string[];
    brands?: string[];
    priceRange?: string;
    searchQuery?: string;
    availability?: string;
}) {
    const queryParams: PaginatedProductsParams = {
        limit: 12,
    };

    if (collectionId) {
        queryParams["collection_id"] = [collectionId];
    }

    if (categoryId) {
        queryParams["category_id"] = [categoryId];
    }

    // Add categories filter
    if (categories && categories.length > 0) {
        queryParams["category_id"] = categories;
    }

    // Add collections filter
    if (collections && collections.length > 0) {
        queryParams["collection_id"] = collections;
    }

    // Add product types filter
    if (productTypes && productTypes.length > 0) {
        queryParams["type_id"] = productTypes;
    }

    if (productsIds) {
        queryParams["id"] = productsIds;
    }

    // Add search query filter
    if (searchQuery && searchQuery.trim() !== "") {
        queryParams["q"] = searchQuery.trim();
    }

    if (sortBy === "created_at") {
        queryParams["order"] = "created_at";
    }

    const region = await getRegion(countryCode);

    if (!region) {
        return null;
    }

    let {
        response: { products, count },
    } = await listProductsWithSort({
        page,
        queryParams,
        sortBy,
        countryCode,
        brandIds: brands && brands.length > 0 ? brands : undefined,
    });

    // Track if client-side filtering is active
    const hasClientSideFilters =
        (priceRange && priceRange !== "all") ||
        (availability && availability !== "all");

    // Client-side filtering for price range (since Medusa API doesn't support direct price filtering)
    if (priceRange && priceRange !== "all") {
        products = products.filter((product) => {
            // Get the minimum price from all variants
            const minPrice = Math.min(
                ...(product.variants?.map((variant) => {
                    const calculatedPrice = variant.calculated_price as any;
                    return calculatedPrice?.calculated_amount || 0;
                }) || [0])
            );

            // Convert from cents to currency units (RON)
            const price = minPrice / 100;

            if (priceRange === "0-50") {
                return price < 50;
            } else if (priceRange === "50-100") {
                return price >= 50 && price < 100;
            } else if (priceRange === "100-200") {
                return price >= 100 && price < 200;
            } else if (priceRange === "200+") {
                return price >= 200;
            }

            return true;
        });
    }

    // Client-side filtering for availability
    if (availability && availability !== "all") {
        products = products.filter((product) => {
            const hasStock = product.variants?.some((variant) => {
                // A variant is in stock if manage_inventory is false OR inventory_quantity > 0
                return (
                    variant.manage_inventory === false ||
                    (variant.inventory_quantity !== undefined &&
                        variant.inventory_quantity > 0)
                );
            });

            if (availability === "in_stock") {
                return hasStock;
            } else if (availability === "out_of_stock") {
                return !hasStock;
            }

            return true;
        });
    }

    // Only calculate pagination from server count when no client-side filters are active
    // Client-side filtering breaks pagination since we only have one page of results
    const totalPages = hasClientSideFilters
        ? 1
        : Math.ceil(count / PRODUCT_LIMIT);

    return (
        <>
            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-ui-fg-subtle text-base-regular">
                        No products found matching your filters.
                    </p>
                </div>
            ) : (
                <>
                    <ul
                        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
                        data-testid="products-list"
                    >
                        {products.map((p) => {
                            return (
                                <li key={p.id}>
                                    <ProductPreview
                                        product={p}
                                        region={region}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    {totalPages > 1 && (
                        <Pagination
                            data-testid="product-pagination"
                            page={page}
                            totalPages={totalPages}
                        />
                    )}
                </>
            )}
        </>
    );
}
