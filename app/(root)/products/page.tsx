'use client';

import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/product";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import Image from "next/image";

function ViewAllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getAllProducts();
        setProducts(res.products);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div className="bg-black"><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product: any) => (
          <Link key={product._id} href={`/products/${product.slug}`}>
            <li >{product.name} - {product.price}</li>
            <img
              src={product.images[0]}
              alt="Product-Image"
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ViewAllProductsPage;
