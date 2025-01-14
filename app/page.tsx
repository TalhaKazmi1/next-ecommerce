"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProductCard from "@/components/ProductCards";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
// import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
}

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setLoading(tssrue)
        const response = await axios.get(`${apiUrl}products`);
        const productsWithFullUrls = response.data.map((product: Product) => ({
          ...product,
          imageUrl: `${apiUrl}${product.imageUrl}`
        }));
        setProducts(productsWithFullUrls);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
 

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Featured Products
        </h2>
        
        {loading ? (
          <Loader/>
        ) : products.length === 0 ? (
          <div className="text-center text-white">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

