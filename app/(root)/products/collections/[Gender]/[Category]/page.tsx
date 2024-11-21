'use client';

import { useEffect, useState } from 'react';
import { getProductByGenderAndCategory } from '@/services/product';
import { useParams } from 'next/navigation';

function CategoryAndGenderProductsPage() {
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]); // Define state to store the products
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  const { Gender, Category } = params; // Extract Gender and Category from URL params

  useEffect(() => {
    // Function to fetch products based on Gender and Category
    const fetchProducts = async () => {
      if (Gender && Category) {
        try {
          setLoading(true); // Set loading to true before fetching
          const fetchedProducts = await getProductByGenderAndCategory(Gender, Category); // Fetch products
          setProducts(fetchedProducts.products); // Update state with fetched products
        } catch (err) {
          setError('Failed to load products'); // Error handling
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchProducts(); // Call the fetch function when Gender or Category changes

  }, [Gender, Category]); // Run the effect when Gender or Category changes

  if (loading) return <div>Loading...</div>; // Show loading state while fetching data
  if (error) return <div>{error}</div>; // Show error message if there is an error

  return (
    <div>
      <h1>{Category} products for {Gender}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product: any) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <img src={product.images[0]} alt={product.name} />
              <p>Price: ${product.price}</p>
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
