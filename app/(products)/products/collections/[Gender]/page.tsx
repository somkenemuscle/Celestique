'use client';

import { useEffect, useState } from 'react';
import { getProductByGender } from '@/services/product';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import Pagination from '@/components/ui/Pagination';
import FilterSortSidebar from '@/components/shared/FilterAndSortSideBar';
import ProductPageSkeleton from '@/components/ui/skelentons/ProductCardSkeleton';


function GenderProductsPage() {
  const params = useParams();
  const { Gender } = params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, Gender]);


  const fetchProducts = async (page: number) => {
    if (Gender) {
      try {
        setLoading(true);
        const res = await getProductByGender(Gender, page);
        setProducts(res.products);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
  };


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Callback to handle state updates
  const handleFilterChange = (newProducts: Product[]) => {
    setProducts(newProducts); // Update state with new products
  };


  if (loading || !products) return <div><ProductPageSkeleton /></div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <FilterSortSidebar
          baseRoute={`/products/${Gender}/all`}
          onFilterChange={handleFilterChange} />
      </div>


      {/* Products and Pagination */}
      <div className="flex-1">
        <ul className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 p-4 sm:p-4 lg:p-11 gap-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default GenderProductsPage;
