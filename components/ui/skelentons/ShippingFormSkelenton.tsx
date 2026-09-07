function ShippingFormSkelenton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="h-3 w-24 animate-pulse bg-ink-100" />
      <div className="mt-6 border-b border-ink-100 pb-6">
        <div className="h-9 w-48 animate-pulse bg-ink-100" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[1fr_400px]">
        {/* Form side */}
        <div className="animate-pulse space-y-10">
          {[...Array(3)].map((_, section) => (
            <div key={section} className="space-y-5">
              <div className="h-3 w-32 border-b border-ink-100 pb-3 bg-ink-100" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="h-11 w-full bg-ink-100" />
                <div className="h-11 w-full bg-ink-100" />
              </div>
              <div className="h-11 w-full bg-ink-100" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="h-11 w-full bg-ink-100" />
                <div className="h-11 w-full bg-ink-100" />
                <div className="h-11 w-full bg-ink-100" />
              </div>
            </div>
          ))}
          <div className="h-12 w-full bg-ink-100" />
        </div>

        {/* Summary side */}
        <div className="lg:h-fit">
          <div className="animate-pulse space-y-4 border border-ink-100 p-6">
            <div className="h-3 w-1/3 bg-ink-100" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-3 py-2">
                <div className="aspect-[3/4] w-14 shrink-0 bg-ink-100" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-2/3 bg-ink-100" />
                  <div className="h-3 w-1/3 bg-ink-100" />
                </div>
              </div>
            ))}
            <div className="h-4 w-full bg-ink-100" />
            <div className="h-4 w-full bg-ink-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingFormSkelenton;
