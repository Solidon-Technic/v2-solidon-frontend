import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";
import { cache } from "react";

export const listBrands = cache(async function (query?: {
    offset?: number;
    limit?: number;
}): Promise<HttpTypes.StoreProductCategoryListResponse> {
    return await sdk.client.fetch<any>(`/store/brands`, {
        method: "GET",
        query: {
            offset: query?.offset ?? 0,
            limit: query?.limit ?? 100,
        },
        cache: "force-cache",
    });
});
