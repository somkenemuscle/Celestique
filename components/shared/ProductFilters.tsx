'use client';

import { useEffect } from 'react';
import { filterColors, filterSizes, sortOptions } from '@/constants/filterSidebar';
import { Check, X } from 'lucide-react';

type ProductFiltersProps = {
    colors: string[];
    sizes: string[];
    sort: string;
    onToggleColor: (color: string) => void;
    onToggleSize: (size: string) => void;
    onSortChange: (sort: string) => void;
    onClearAll: () => void;
    open: boolean;
    onClose: () => void;
};

const groupHeading =
    'text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900';

function FilterGroups({
    colors,
    sizes,
    sort,
    onToggleColor,
    onToggleSize,
    onSortChange,
}: Omit<ProductFiltersProps, 'open' | 'onClose' | 'onClearAll'>) {
    return (
        <div className="space-y-10">
            {/* Sort */}
            <section>
                <h3 className={groupHeading}>Sort</h3>
                <div className="mt-4 space-y-3">
                    {[{ label: 'Featured', value: '' }, ...sortOptions].map((option) => {
                        const active = sort === option.value;
                        return (
                            <button
                                key={option.value || 'featured'}
                                onClick={() => onSortChange(option.value)}
                                className={`flex w-full items-center justify-between text-sm transition-colors ${
                                    active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                                }`}
                            >
                                <span>{option.value ? `Price: ${option.label}` : 'Featured'}</span>
                                <span
                                    className={`h-3.5 w-3.5 rounded-full border transition-colors ${
                                        active ? 'border-ink-900 bg-ink-900' : 'border-ink-300'
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </section>

            <div className="h-px bg-ink-100" />

            {/* Colour */}
            <section>
                <h3 className={groupHeading}>Colour</h3>
                <div className="mt-4 grid grid-cols-6 gap-3">
                    {filterColors.map((color) => {
                        const active = colors.includes(color);
                        return (
                            <button
                                key={color}
                                title={color}
                                aria-pressed={active}
                                onClick={() => onToggleColor(color)}
                                className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition ${
                                    active
                                        ? 'border-ink-900 ring-1 ring-ink-900 ring-offset-2'
                                        : 'border-ink-200 hover:border-ink-400'
                                }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                            >
                                {active && (
                                    <Check
                                        className="h-3.5 w-3.5 text-white mix-blend-difference"
                                        strokeWidth={3}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>

            <div className="h-px bg-ink-100" />

            {/* Size */}
            <section>
                <h3 className={groupHeading}>Size</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {filterSizes.map((size) => {
                        const active = sizes.includes(size);
                        return (
                            <button
                                key={size}
                                aria-pressed={active}
                                onClick={() => onToggleSize(size)}
                                className={`min-w-[3rem] border px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${
                                    active
                                        ? 'border-ink-900 bg-ink-900 text-white'
                                        : 'border-ink-200 text-ink-700 hover:border-ink-900'
                                }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

function ProductFilters(props: ProductFiltersProps) {
    const { open, onClose, onClearAll } = props;

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {/* Desktop rail */}
            <aside className="hidden w-60 shrink-0 lg:block">
                <div className="sticky top-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-900">
                            Filters
                        </h2>
                        <button
                            onClick={onClearAll}
                            className="text-[11px] uppercase tracking-[0.12em] text-ink-400 transition-colors hover:text-ink-900"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="mt-8">
                        <FilterGroups {...props} />
                    </div>
                </div>
            </aside>

            {/* Mobile drawer */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden ${
                    open ? '' : 'pointer-events-none'
                }`}
                aria-hidden={!open}
            >
                <div
                    onClick={onClose}
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                        open ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <div
                    className={`absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-900">
                            Filters
                        </h2>
                        <button onClick={onClose} aria-label="Close filters">
                            <X className="h-5 w-5 text-ink-700" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-8">
                        <FilterGroups {...props} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-ink-100 px-6 py-4">
                        <button
                            onClick={onClearAll}
                            className="border border-ink-200 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-700 transition hover:border-ink-900"
                        >
                            Clear
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-ink-900 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-ink-700"
                        >
                            Show results
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductFilters;
