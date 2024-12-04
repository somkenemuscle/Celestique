'use client';

import { useEffect, useState } from 'react';
import { getProductByGenderAndCategory } from '@/services/product';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';



function CategoryAndGenderProductsPage() {
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { Gender, Category } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      if (Gender && Category) {
        try {
          setLoading(true);
          const fetchedProducts = await getProductByGenderAndCategory(Gender, Category);
          setProducts(fetchedProducts.products);
        } catch (err) {
          setError('Failed to load products');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();

  }, [Gender, Category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='mt-32'>
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 sm:p-4 lg:p-11 gap-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default CategoryAndGenderProductsPage;
