
function ShippingFormSkelenton() {
    return (
        <div className="mt-10 mb-10">
            <div className="container mx-auto px-6 sm:px-6 md:px-20 lg:px-20">
                {/* Main Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* SHIPPING FORM SECTION - Left */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Delivery Details */}
                        <div>
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2"></div>
                            <div className="w-full p-4 border border-gray-200 text-sm rounded-xl mt-3 flex justify-between items-center">
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>

                        {/* Firstname and Lastname Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                        </div>

                        {/* Country Input */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>

                        {/* Address Input */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>

                        {/* City, State, and Postal Code Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                        </div>

                        {/* Phone Number Input */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>

                        {/* Shipping Method Section */}
                        <div>
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                            <div className="w-full p-4 border border-gray-200 text-sm rounded-xl mt-3 flex justify-between items-center">
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div>
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2"></div>
                            <div className="w-full p-4 border border-gray-200 text-sm rounded-xl mt-3 flex justify-between items-center">
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded mt-3"></div>
                        </div>

                        {/* Submit Button */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                    </div>

                    {/* CHECKOUT SUMMARY SECTION - Right */}
                    <div className="p-6 border lg:px-10 lg:col-span-6 rounded-xl sm:h-full lg:h-full bg-gray-50">
                        {/* Cart Items */}
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center border-b pb-4">
                                    {/* Product Image */}
                                    <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-xl"></div>
                                    {/* Product Details */}
                                    <div className="ml-4 flex-grow space-y-2">
                                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="text-sm space-y-4">
                            <div className="flex justify-between items-center py-2">
                                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between items-center font-bold text-lg py-2">
                                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShippingFormSkelenton