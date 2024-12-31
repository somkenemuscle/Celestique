
function CartSkeleton() {
    return (
        <div className="cart-body mt-10 container mx-auto p-10 grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 animate-pulse rounded mb-6"></div>

                {/* Skeleton for Cart Items */}
                <div className="space-y-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="flex items-center border-b pb-4 mb-4">
                            {/* Product Image Skeleton */}
                            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-xl"></div>
                            <div className="ml-4 flex-grow">
                                {/* Product Details Skeleton */}
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
                                {/* Quantity Controls Skeleton */}
                                <div className="flex items-center space-x-2">
                                    <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-6 w-6 bg-gray-200 animate-pulse rounded ml-4"></div>
                                </div>
                            </div>
                            {/* Price Skeleton */}
                            <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="h-72 border p-6 rounded-lg space-y-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
                <hr className="my-4" />
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                </div>
                <hr className="my-4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                <hr className="my-4" />
                <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 ml-auto"></div>
            </div>
        </div>


    )
}

export default CartSkeleton