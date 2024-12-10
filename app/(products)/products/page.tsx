'use client';

import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/product";
import Loader from "@/components/ui/Loader";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import FilterSortSidebar from "@/components/shared/FilterAndSortSideBar";

function ViewAllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);



  const fetchProducts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllProducts(page);
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Callback to handle state updates
  const handleFilterChange = (newProducts: Product[], pages: number) => {
    setProducts(newProducts);
    setTotalPages(pages)
  };

  if (loading) return <div className="bg-black"><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <FilterSortSidebar
          baseRoute={'/products'}
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

export default ViewAllProductsPage;
