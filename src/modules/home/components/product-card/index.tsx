"use client";

import { HttpTypes } from "@medusajs/types";
import { getProductPrice } from "@lib/util/get-product-price";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "@modules/products/components/thumbnail";
import { Heart } from "@medusajs/icons";
import { clx } from "@medusajs/ui";

type ProductCardProps = {
    product: HttpTypes.StoreProduct;
    showBadge?: boolean;
    geniusDeal?: boolean;
};

export default function ProductCard({
    product,
    showBadge = false,
    geniusDeal = false,
}: ProductCardProps) {
    const { cheapestPrice } = getProductPrice({ product });

    const hasDiscount =
        cheapestPrice?.price_type === "sale" &&
        cheapestPrice?.percentage_diff;

    return (
        <div className="product-card group">
            <LocalizedClientLink
                href={`/products/${product.handle}`}
                className="block"
            >
                {/* Badge Section */}
                {geniusDeal && (
                    <div className="product-card-genius-badge">genius</div>
                )}
                {!geniusDeal && hasDiscount && showBadge && (
                    <div className="product-card-sale-badge">Oferte Smart</div>
                )}

                {/* Favorite Button */}
                <button
                    className="product-card-favorite"
                    onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement wishlist functionality
                    }}
                    aria-label="Adaugă la favorite"
                >
                    <Heart className="w-4 h-4 text-gray-600" />
                </button>

                {/* Product Image */}
                <div className="aspect-square w-full">
                    <Thumbnail
                        thumbnail={product.thumbnail}
                        images={product.images}
                        size="full"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                        {product.title}
                    </h3>

                    {/* Rating placeholder - adjust based on available data */}
                    {product.metadata?.rating && (
                        <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={clx("text-sm", {
                                            "text-gray-300":
                                                i >=
                                                Math.floor(
                                                    Number(
                                                        product.metadata?.rating
                                                    )
                                                ),
                                        })}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {product.metadata?.review_count && (
                                <span className="text-xs text-gray-500">
                                    ({product.metadata.review_count})
                                </span>
                            )}
                        </div>
                    )}

                    {/* Price Section */}
                    {cheapestPrice && (
                        <div className="flex flex-col gap-1">
                            {hasDiscount && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 line-through">
                                        {cheapestPrice.original_price}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span
                                    className={clx("text-lg font-bold", {
                                        "text-sales": hasDiscount,
                                        "text-gray-900": !hasDiscount,
                                    })}
                                >
                                    {cheapestPrice.calculated_price}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </LocalizedClientLink>
        </div>
    );
}

