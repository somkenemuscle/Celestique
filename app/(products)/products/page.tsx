'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';
import ProductCard from '@/components/ui/ProductCard';
import Pagination from '@/components/ui/Pagination';
import ProductFilters from '@/components/shared/ProductFilters';
import ProductGridSkeleton from '@/components/ui/skelentons/ProductGridSkeleton';
import { sortOptions } from '@/constants/filterSidebar';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

type Chip = { type: 'color' | 'size' | 'sort'; value: string; label: string };

function ViewAllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState('');

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const activeCount = colors.length + sizes.length + (sort ? 1 : 0);
  const sortLabel = sortOptions.find((o) => o.value === sort)?.label;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = { page: currentPage };
      if (colors.length) params.color = colors.join(',');
      if (sizes.length) params.size = sizes.join(',');
      if (sort) params.sortPrice = sort;

      const res = await axiosInstance.get('/products', { params });
      setProducts(res.data.products ?? []);
      setTotalPages(res.data.totalPages ?? 1);
      setTotalCount(
        res.data.totalProducts ??
          res.data.totalCount ??
          res.data.count ??
          null
      );
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, colors, sizes, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleColor = (color: string) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const changeSort = (value: string) => {
    setSort(value);
    setCurrentPage(1);
    setSortOpen(false);
  };

  const clearAll = () => {
    setColors([]);
    setSizes([]);
    setSort('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chips: Chip[] = [
    ...colors.map((c): Chip => ({ type: 'color', value: c, label: c })),
    ...sizes.map((s): Chip => ({ type: 'size', value: s, label: `Size ${s}` })),
    ...(sort
      ? [{ type: 'sort', value: sort, label: `Price: ${sortLabel}` } as Chip]
      : []),
  ];

  const removeChip = (chip: Chip) => {
    if (chip.type === 'color') toggleColor(chip.value);
    else if (chip.type === 'size') toggleSize(chip.value);
    else changeSort('');
  };

  const sortRow = (active: boolean) =>
    `block w-full px-4 py-2.5 text-left text-[11px] uppercase tracking-[0.1em] transition-colors ${
      active ? 'text-ink-900' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
    }`;

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="border-b border-ink-100 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
            <nav className="hidden text-[11px] uppercase tracking-[0.16em] text-ink-400 sm:block">
              <Link href="/" className="transition-colors hover:text-ink-900">
                Home
              </Link>
              <span className="px-1.5">/</span>
              <span className="text-ink-700">Shop</span>
            </nav>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900"
            >
              Sort{sort ? `: ${sortLabel}` : ''}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-48 border border-ink-100 bg-white py-1 shadow-lg">
                  <button
                    onClick={() => changeSort('')}
                    className={sortRow(sort === '')}
                  >
                    Featured
                  </button>
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => changeSort(option.value)}
                      className={sortRow(sort === option.value)}
                    >
                      Price: {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 pb-3">
            {chips.map((chip) => (
              <button
                key={`${chip.type}-${chip.value}`}
                onClick={() => removeChip(chip)}
                className="inline-flex items-center gap-1.5 border border-ink-200 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-700 transition hover:border-ink-900 hover:text-ink-900"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="ml-1 text-[11px] uppercase tracking-[0.12em] text-ink-400 underline underline-offset-4 transition-colors hover:text-ink-900"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex gap-10 py-10 lg:py-12">
          <ProductFilters
            colors={colors}
            sizes={sizes}
            sort={sort}
            onToggleColor={toggleColor}
            onToggleSize={toggleSize}
            onSortChange={changeSort}
            onClearAll={clearAll}
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          <div className="min-w-0 flex-1">
            {error ? (
              <div className="py-24 text-center">
                <p className="text-sm text-ink-500">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="mt-4 border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:bg-ink-900 hover:text-white"
                >
                  Retry
                </button>
              </div>
            ) : loading ? (
              <ProductGridSkeleton />
            ) : products.length === 0 ? (
              <div className="py-24 text-center">
                <h2 className="text-lg font-medium text-ink-900">
                  Nothing matches these filters
                </h2>
                <p className="mt-2 text-sm text-ink-500">
                  Try removing a filter or two.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:bg-ink-900 hover:text-white"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </ul>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllProductsPage;
