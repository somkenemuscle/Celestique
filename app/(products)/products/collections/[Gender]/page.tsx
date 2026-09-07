'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import ProductBrowser, { FetchOpts } from '@/components/shared/ProductBrowser';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function GenderProductsPage() {
  const params = useParams();
  const gender = Array.isArray(params.Gender) ? params.Gender[0] : params.Gender ?? '';

  const fetcher = useCallback(
    async (opts: FetchOpts) => {
      const res = await axiosInstance.get(`/products/${gender}/all`, { params: opts });
      return { products: res.data.products ?? [], totalPages: res.data.totalPages ?? 1 };
    },
    [gender]
  );

  return (
    <ProductBrowser
      fetcher={fetcher}
      title={cap(gender)}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/products' },
        { label: cap(gender) },
      ]}
    />
  );
}

export default GenderProductsPage;
