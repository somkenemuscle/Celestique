
function ProductHomePageSkeleton() {
    return (
        <div className="pl-8">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="mb-7 mt-7 relative animate-pulse mr-8">
                        {/* Skeleton Image */}
                        <div className="w-[170px] md:w-[200px] xl:w-[250px] h-96 bg-gray-200 rounded"></div>

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
    );
}

export default ProductHomePageSkeleton;
