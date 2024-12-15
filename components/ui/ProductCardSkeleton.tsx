
function ProductPageSkeleton() {
    return (
        <div className="flex">
            {/* Sidebar Skeleton */}
            <div className="w-64 p-4 bg-white animate-pulse hidden sm:block">

            </div>

            {/* Product List Skeleton */}
            <div className="flex-1 p-4">
                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <li key={index} className="mb-7 mt-7 relative animate-pulse mr-8">
                            {/* Skeleton Image */}
                            <div className="w-11/12 h-96 bg-gray-200 rounded"></div>

                            {/* Skeleton Product Name */}
                            <div className="mt-2 w-3/4 h-4 bg-gray-200 rounded"></div>

                            {/* Skeleton Price */}
                            <div className="mt-2 w-1/2 h-4 bg-gray-200 rounded"></div>

                            {/* Skeleton Colors */}
                            <ul className="mt-2 flex space-x-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductPageSkeleton;
