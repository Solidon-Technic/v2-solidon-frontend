import { Suspense } from "react";

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { listProductTypes } from "@lib/data/product-types";
import { listBrands } from "@lib/data/brands";
import { HttpTypes } from "@medusajs/types";

export default async function CollectionTemplate({
    sortBy,
    collection,
    page,
    countryCode,
    categories,
    collections,
    productTypes,
    priceRange,
    searchQuery,
    availability,
    brands,
}: {
    sortBy?: SortOptions;
    collection: HttpTypes.StoreCollection;
    page?: string;
    countryCode: string;
    categories?: string;
    collections?: string;
    productTypes?: string;
    priceRange?: string;
    searchQuery?: string;
    availability?: string;
    brands?: string;
}) {
    const pageNumber = page ? parseInt(page) : 1;
    const sort = sortBy || "created_at";
    const selectedCategories = categories ? categories.split(",") : [];
    const selectedCollections = collections ? collections.split(",") : [];
    const selectedTypes = productTypes ? productTypes.split(",") : [];
    const selectedBrands = brands ? brands.split(",") : [];
    const price = priceRange || "all";
    const query = searchQuery || "";
    const stock = availability || "all";

    // Fetch filter data
    const allCategories = await listCategories({ limit: 100 });
    const parentCategories = allCategories.filter(
        (cat) => !cat.parent_category_id
    );
    const allCollections = await listCollections({ limit: 100 });
    const allProductTypes = await listProductTypes({ limit: 100 });
    const allBrands = await listBrands({ limit: 100 });

    return (
        <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
            <RefinementList
                sortBy={sort}
                categories={parentCategories}
                selectedCategories={selectedCategories}
                collections={allCollections}
                selectedCollections={selectedCollections}
                productTypes={allProductTypes}
                selectedTypes={selectedTypes}
                brands={allBrands}
                selectedBrands={selectedBrands}
                priceRange={price}
                searchQuery={query}
                availability={stock}
            />
            <div className="w-full">
                <div className="mb-8 text-2xl-semi">
                    <h1>{collection.title}</h1>
                </div>
                <Suspense
                    fallback={
                        <SkeletonProductGrid
                            numberOfProducts={collection.products?.length}
                        />
                    }
                >
                    <PaginatedProducts
                        sortBy={sort}
                        page={pageNumber}
                        collectionId={collection.id}
                        countryCode={countryCode}
                    />
                </Suspense>
            </div>
        </div>
    );
}
