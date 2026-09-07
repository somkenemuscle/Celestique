function SlugPageSkelenton() {
    return (
        <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6 lg:px-10">
            <div className="h-3 w-40 animate-pulse bg-ink-100" />

            <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2 xl:gap-x-16">
                {/* Gallery */}
                <div className="animate-pulse">
                    <div className="aspect-[3/4] w-full bg-ink-100" />
                    <div className="mt-4 grid grid-cols-5 gap-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-ink-100" />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="animate-pulse space-y-4">
                    <div className="h-3 w-24 bg-ink-100" />
                    <div className="h-7 w-3/4 bg-ink-100" />
                    <div className="h-5 w-1/3 bg-ink-100" />
                    <div className="h-3 w-28 bg-ink-100" />
                    <div className="h-px w-full bg-ink-100" />
                    <div className="h-3 w-16 bg-ink-100" />
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 w-12 bg-ink-100" />
                        ))}
                    </div>
                    <div className="h-3 w-16 bg-ink-100" />
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-10 w-24 bg-ink-100" />
                        ))}
                    </div>
                    <div className="h-11 w-32 bg-ink-100" />
                    <div className="h-12 w-full bg-ink-100" />
                    <div className="h-12 w-full bg-ink-100" />
                </div>
            </div>
        </div>
    );
}

export default SlugPageSkelenton;
