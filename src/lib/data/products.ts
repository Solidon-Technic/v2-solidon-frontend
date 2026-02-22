"use server";

import { sdk } from "@lib/config";
import { sortProducts } from "@lib/util/sort-products";
import { HttpTypes } from "@medusajs/types";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { getAuthHeaders, getCacheOptions } from "./cookies";
import { getRegion, retrieveRegion } from "./regions";

/** Medusa v2 stochează prețurile în unități majore (ex: 50 RON = 50) */
const PRICE_RANGES_MAP: Record<
    string,
    { min: number; max: number }
> = {
    sub50: { min: 0, max: 50 },
    "50-100": { min: 50, max: 100 },
    "100-200": { min: 100, max: 200 },
    "200-500": { min: 200, max: 500 },
    "500-1000": { min: 500, max: 1000 },
    "1000-1500": { min: 1000, max: 1500 },
    "1500-2000": { min: 1500, max: 2000 },
    "2000-3000": { min: 2000, max: 3000 },
};

function getProductMinPrice(product: HttpTypes.StoreProduct): number {
    if (!product.variants?.length) return Infinity;
    return Math.min(
        ...product.variants.map(
            (v: any) => v?.calculated_price?.calculated_amount ?? Infinity
        )
    );
}

function filterByPrice(
    products: HttpTypes.StoreProduct[],
    priceRanges?: string[],
    priceMin?: number,
    priceMax?: number,
    useCustomInterval?: boolean
): HttpTypes.StoreProduct[] {
    if (
        (!priceRanges?.length && !useCustomInterval) ||
        (useCustomInterval && (priceMin == null || priceMax == null))
    ) {
        return products;
    }

    return products.filter((p) => {
        const minAmount = getProductMinPrice(p);
        if (minAmount === Infinity) return false;

        if (useCustomInterval && priceMin != null && priceMax != null) {
            return minAmount >= priceMin && minAmount <= priceMax;
        }

        if (priceRanges?.length) {
            return priceRanges.some((rid) => {
                const range = PRICE_RANGES_MAP[rid];
                if (!range) return false;
                return minAmount >= range.min && minAmount < range.max;
            });
        }

        return true;
    });
}

function isVariantInStock(variant: any): boolean {
    if (!variant) return false;
    if (!variant.manage_inventory) return true;
    if (variant.allow_backorder) return true;
    return (variant.inventory_quantity ?? 0) > 0;
}

function isProductInStock(product: HttpTypes.StoreProduct): boolean {
    if (!product.variants?.length) return false;
    return product.variants.some((v: any) => isVariantInStock(v));
}

function filterByAvailability(
    products: HttpTypes.StoreProduct[],
    inStockOnly?: boolean
): HttpTypes.StoreProduct[] {
    if (!inStockOnly) return products;
    return products.filter(isProductInStock);
}

/**
 * Fetch multiple products by ID. Uses individual retrieve calls to avoid
 * query serialization issues with array params. Preserves order from productIds.
 */
export const getProductsByIds = async ({
    productIds,
    regionId,
}: {
    productIds: string[];
    regionId: string;
}): Promise<HttpTypes.StoreProduct[]> => {
    if (!productIds?.length) return [];

    const headers = await getAuthHeaders();
    const next = await getCacheOptions("products");
    const query = {
        region_id: regionId,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
    };

    const results = await Promise.allSettled(
        productIds.map((id) =>
            sdk.client.fetch<{ product: HttpTypes.StoreProduct }>(
                `/store/products/${id}`,
                {
                    method: "GET",
                    query,
                    headers,
                    next,
                    cache: "no-store",
                }
            )
        )
    );

    return productIds
        .map((id, i) => {
            const r = results[i];
            if (r.status === "fulfilled" && r.value?.product) {
                return r.value.product;
            }
            return null;
        })
        .filter(Boolean) as HttpTypes.StoreProduct[];
};

export const listProducts = async ({
    pageParam = 1,
    queryParams,
    countryCode,
    regionId,
}: {
    pageParam?: number;
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
    countryCode?: string;
    regionId?: string;
}): Promise<{
    response: { products: HttpTypes.StoreProduct[]; count: number };
    nextPage: number | null;
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}> => {
    if (!countryCode && !regionId) {
        throw new Error("Country code or region ID is required");
    }

    const limit = queryParams?.limit || 12;
    const _pageParam = Math.max(pageParam, 1);
    const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

    let region: HttpTypes.StoreRegion | undefined | null;

    if (countryCode) {
        region = await getRegion(countryCode);
    } else {
        region = await retrieveRegion(regionId!);
    }

    if (!region) {
        return {
            response: { products: [], count: 0 },
            nextPage: null,
        };
    }

    const headers = {
        ...(await getAuthHeaders()),
    };

    const next = {
        ...(await getCacheOptions("products")),
    };

    return sdk.client
        .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
            `/store/products`,
            {
                method: "GET",
                query: {
                    limit,
                    offset,
                    region_id: region?.id,
                    fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
                    ...queryParams,
                },
                headers,
                next,
                // Ensure fresh pricing after backend changes (prices/regions)
                cache: "no-store",
            }
        )
        .then(({ products, count }) => {
            const nextPage = count > offset + limit ? pageParam + 1 : null;

            return {
                response: {
                    products,
                    count,
                },
                nextPage: nextPage,
                queryParams,
            };
        });
};

/**
 * This will fetch products, filter by price (client-side), sort, and paginate.
 * When price filter is active, fetches 500 products to allow for filtering.
 */
export const listProductsWithSort = async ({
    page = 0,
    queryParams,
    sortBy = "created_at",
    countryCode,
    priceRanges,
    priceMin,
    priceMax,
    useCustomPriceInterval,
    inStockOnly,
}: {
    page?: number;
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
    sortBy?: SortOptions;
    countryCode: string;
    priceRanges?: string[];
    priceMin?: number;
    priceMax?: number;
    useCustomPriceInterval?: boolean;
    inStockOnly?: boolean;
}): Promise<{
    response: { products: HttpTypes.StoreProduct[]; count: number };
    nextPage: number | null;
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
    const limit = queryParams?.limit || 12;
    const hasPriceFilter =
        (priceRanges?.length ?? 0) > 0 ||
        (useCustomPriceInterval && priceMin != null && priceMax != null);
    const hasClientFilter = hasPriceFilter || inStockOnly;
    const fetchLimit = hasClientFilter ? 500 : 100;

    const {
        response: { products, count },
    } = await listProducts({
        pageParam: 0,
        queryParams: {
            ...queryParams,
            limit: fetchLimit,
        },
        countryCode,
    });

    let filteredProducts = filterByPrice(
        products,
        priceRanges,
        priceMin,
        priceMax,
        useCustomPriceInterval
    );

    filteredProducts = filterByAvailability(filteredProducts, inStockOnly);

    const sortedProducts = sortProducts(filteredProducts, sortBy);
    const filteredCount = sortedProducts.length;

    const pageParam = (page - 1) * limit;

    const nextPage = filteredCount > pageParam + limit ? pageParam + limit : null;

    const paginatedProducts = sortedProducts.slice(
        pageParam,
        pageParam + limit
    );

    return {
        response: {
            products: paginatedProducts,
            count: filteredCount,
        },
        nextPage,
        queryParams,
    };
};
