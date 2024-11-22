'use client';

import { useEffect, useState } from 'react';
import { getProductByGenderAndCategory } from '@/services/product';
import { useParams } from 'next/navigation';
import Image from 'next/image';


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
    <div>
      <h1>{Category} products for {Gender}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product: any) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <Image
                src={product.images[0]}
                alt="Product-Image"
                width={500}
                height={500}
              />
              <p>Price: ₦{product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default CategoryAndGenderProductsPage;
