function ProductGridSkeleton() {
    return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <li key={index} className="animate-pulse">
                    <div className="aspect-[3/4] w-full bg-ink-100" />
                    <div className="mt-3 h-3 w-3/4 bg-ink-100" />
                    <div className="mt-2 h-3 w-1/3 bg-ink-100" />
                </li>
            ))}
        </ul>
    );
}

export default ProductGridSkeleton;
