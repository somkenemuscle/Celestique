function CartSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="border-b border-ink-100 pb-6">
        <div className="h-9 w-56 animate-pulse bg-ink-100" />
        <div className="mt-3 h-3 w-20 animate-pulse bg-ink-100" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-ink-100 border-y border-ink-100">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="flex animate-pulse gap-4 py-6 sm:gap-6">
              <div className="aspect-[3/4] w-24 shrink-0 bg-ink-100 sm:w-28" />
              <div className="flex flex-1 flex-col">
                <div className="h-3 w-1/2 bg-ink-100" />
                <div className="mt-2 h-3 w-1/3 bg-ink-100" />
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="h-9 w-28 bg-ink-100" />
                  <div className="h-3 w-16 bg-ink-100" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:h-fit">
          <div className="animate-pulse space-y-4 border border-ink-100 p-6">
            <div className="h-3 w-1/3 bg-ink-100" />
            <div className="h-4 w-full bg-ink-100" />
            <div className="h-4 w-full bg-ink-100" />
            <div className="h-12 w-full bg-ink-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
