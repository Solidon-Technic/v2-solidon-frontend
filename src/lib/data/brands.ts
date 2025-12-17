import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";
import { getCacheOptions } from "./cookies";

export const listBrands = async (query?: Record<string, any>) => {
    const next = {
        ...(await getCacheOptions("brands")),
    };

    const limit = query?.limit || 100;

    return sdk.client
        .fetch<{ brands: any[] }>("/store/brands", {
            query: {
                limit,
                ...query,
            },
            next,
            cache: "force-cache",
        })
        .then(({ brands }) => brands);
};
