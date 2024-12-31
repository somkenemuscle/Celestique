
function SlugPageSkelenton() {
    return (
        <div className="grid grid-cols-12 slug-page-body mt-10 gap-6">

            {/* Skeleton Carousel Section */}
            <div className="col-span-12 md:col-span-6 flex justify-center">
                <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Skeleton Product Details Section */}
            <div className="col-span-12 p-10 lg:pr-20 sm:p-20 md:col-span-6 space-y-6">
                {/* Brand Name */}
                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                {/* Product Name */}
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                {/* Product Price */}
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                {/* Stock Status */}
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                {/* Size Selection */}
                <div>
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                {/* Color Selection */}
                <div>
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                {/* Quantity Selection */}
                <div>
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </div>
                {/* Add to Cart Button */}
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                {/* Save for Later Button */}
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                {/* Product Details */}
                <div>
                    <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SlugPageSkelenton