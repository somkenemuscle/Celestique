'use client';

import { useCallback } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import ProductBrowser, { FetchOpts } from '@/components/shared/ProductBrowser';

function ViewAllProductsPage() {
  const fetcher = useCallback(async (opts: FetchOpts) => {
    const res = await axiosInstance.get('/products', { params: opts });
    return { products: res.data.products ?? [], totalPages: res.data.totalPages ?? 1 };
  }, []);

  return <ProductBrowser fetcher={fetcher} />;
}

export default ViewAllProductsPage;
