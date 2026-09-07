'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSearchedItems } from '@/services/search';
import Pagination from '@/components/ui/Pagination';
import ProductCard from '@/components/ui/ProductCard';
import ProductGridSkeleton from '@/components/ui/skelentons/ProductGridSkeleton';
import { Search as SearchIcon, X } from 'lucide-react';
import debounce from 'lodash.debounce';

const POPULAR = ['Dresses', 'Shirts', 'Tops', 'Shorts', 'Gowns'];

export default function SearchPage() {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);

  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const debouncedSuggest = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        setSuggestLoading(true);
        const res = await getSearchedItems(value.trim(), 1);
        setSuggestions(res.products ?? []);
        setShowSuggestions(true);
      } catch (err) {
        console.log(err);
      } finally {
        setSuggestLoading(false);
      }
    }, 220),
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTerm(value);
    debouncedSuggest(value);
  }

  const runSearch = useCallback(async (value: string, page = 1) => {
    const q = value.trim();
    if (!q) return;
    setShowSuggestions(false);
    setLoading(true);
    setSearched(true);
    setQuery(q);
    setCurrentPage(page);
    try {
      const res = await getSearchedItems(q, page);
      setResults(res.products ?? []);
      setTotalPages(res.totalPages ?? 1);
    } catch (err) {
      setResults([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(term);
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    runSearch(query, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearInput() {
    setTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
      {/* Search hero */}
      <div className="mx-auto max-w-2xl pt-14 text-center lg:pt-20">
        <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
          Search the store
        </h1>

        <div ref={boxRef} className="relative mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-ink-900">
              <SearchIcon className="h-5 w-5 shrink-0 text-ink-400" />
              <input
                ref={inputRef}
                value={term}
                onChange={handleChange}
                onFocus={() => term.trim() && setShowSuggestions(true)}
                onKeyDown={(e) => e.key === 'Escape' && setShowSuggestions(false)}
                type="text"
                placeholder="What are you looking for?"
                className="w-full bg-transparent px-3 py-3.5 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
              {term && (
                <button
                  type="button"
                  onClick={clearInput}
                  aria-label="Clear"
                  className="shrink-0 p-1 text-ink-400 transition-colors hover:text-ink-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 border border-ink-100 bg-white text-left shadow-xl">
              {suggestLoading && suggestions.length === 0 ? (
                <p className="px-5 py-4 text-sm text-ink-400">Searching…</p>
              ) : suggestions.length > 0 ? (
                <ul className="max-h-[60vh] divide-y divide-ink-50 overflow-y-auto">
                  {suggestions.slice(0, 6).map((s) => (
                    <li key={s._id}>
                      <button
                        onClick={() => runSearch(s.name)}
                        className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-ink-50"
                      >
                        <span className="relative h-14 w-11 shrink-0 overflow-hidden bg-ink-50">
                          {s.images?.[0] && (
                            <Image
                              src={s.images[0]}
                              alt={s.name}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-ink-800">
                            {s.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-500">
                            ₦{s.price?.toLocaleString()}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-4 text-sm text-ink-400">No matches</p>
              )}
              <button
                onClick={() => runSearch(term)}
                className="w-full bg-ink-900 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink-700"
              >
                Search for &ldquo;{term.trim()}&rdquo;
              </button>
            </div>
          )}
        </div>

        {/* Popular searches */}
        {!searched && (
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Popular searches
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {POPULAR.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setTerm(p);
                    runSearch(p);
                  }}
                  className="border border-ink-200 px-4 py-2 text-xs uppercase tracking-[0.1em] text-ink-700 transition hover:border-ink-900 hover:text-ink-900"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {searched && (
        <div className="py-12 lg:py-16">
          {loading ? (
            <ProductGridSkeleton />
          ) : results.length > 0 ? (
            <>
              <p className="mb-8 text-[11px] uppercase tracking-[0.16em] text-ink-400">
                Results for &ldquo;{query}&rdquo;
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-medium text-ink-900">
                No results for &ldquo;{query}&rdquo;
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Check the spelling or try a different term.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
