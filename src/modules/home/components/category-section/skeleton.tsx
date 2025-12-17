export default function CategorySectionSkeleton() {
    return (
        <section className="py-8">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Carousel Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg overflow-hidden shadow"
                    >
                        <div className="aspect-square bg-gray-200 animate-pulse" />
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

