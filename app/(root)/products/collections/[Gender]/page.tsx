'use client';

import { useEffect, useState } from 'react';
import { getProductByGender } from '@/services/product';
import { useParams } from 'next/navigation';
import Image from 'next/image';


function GenderProductsPage() {
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]); // Define state to store the products
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  const { Gender } = params; // Extract Gender and Category from URL params

  useEffect(() => {
    // Function to fetch products based on Gender and Category
    const fetchProducts = async () => {
      if (Gender) {
        try {
          setLoading(true); // Set loading to true before fetching
          const fetchedProducts = await getProductByGender(Gender); // Fetch products
          setProducts(fetchedProducts.products); // Update state with fetched products
        } catch (err) {
          setError('Failed to load products'); // Error handling
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchProducts(); // Call the fetch function when Gender or Category changes

  }, [Gender]); // Run the effect when Gender or Category changes

  if (loading) return <div>Loading...</div>; // Show loading state while fetching data
  if (error) return <div>{error}</div>; // Show error message if there is an error

  return (
    <div>
      <h1>products for {Gender}</h1>
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

export default GenderProductsPage;
