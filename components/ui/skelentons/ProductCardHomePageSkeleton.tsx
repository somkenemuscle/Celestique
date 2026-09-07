function ProductHomePageSkeleton() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">
            <div className="mb-10 flex animate-pulse flex-col items-center">
                <div className="h-2.5 w-24 bg-ink-100" />
                <div className="mt-4 h-8 w-64 bg-ink-100" />
                <div className="mt-5 h-2.5 w-16 bg-ink-100" />
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="animate-pulse">
                        <div className="aspect-[3/4] w-full bg-ink-100" />
                        <div className="mt-3 h-3 w-3/4 bg-ink-100" />
                        <div className="mt-2 h-3 w-1/3 bg-ink-100" />
                        <div className="mt-3 flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-ink-100" />
                            <div className="h-3 w-3 rounded-full bg-ink-100" />
                            <div className="h-3 w-3 rounded-full bg-ink-100" />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ProductHomePageSkeleton;
