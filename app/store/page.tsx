"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  category: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: Infinity,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        const productsWithFullUrls = response.data.map((product: Product) => ({
          ...product,
          imageUrl: `${apiUrl}${product.imageUrl}`,
        }));
        setProducts(productsWithFullUrls);
        setFilteredProducts(productsWithFullUrls);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (filters.category === "" || product.category === filters.category) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <AnimatedNavbar />

      <div className="max-w-7xl mx-auto px-4 py-16 flex">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className="flex-1 ml-8">
          <h1 className="text-4xl font-bold text-white mb-8">Our Products</h1>

          {loading ? (
            <Loader />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-white">No products found</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      imageUrl={product.imageUrl}
                      category={""}
                      rating={5}
                      stock={10}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
