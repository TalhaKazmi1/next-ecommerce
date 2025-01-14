'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  description:string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl,description }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only run on the client side
    }
  }, []);

  // Function to generate random gradient colors
  const getRandomGradient = () => {
    const colors = [
        ['from-yellow-400', 'to-pink-500'],   // yellow to pink
        ['from-blue-400', 'to-purple-500'],   // blue to purple
        ['from-green-400', 'to-teal-400'],    // green to teal
        ['from-red-400', 'to-orange-500'],    // red to orange
        ['from-indigo-400', 'to-cyan-400'],   // indigo to cyan
        ['from-teal-500', 'to-blue-400'],     // teal to blue
        ['from-pink-400', 'to-red-500'],      // pink to red
        ['from-green-500', 'to-yellow-500'],  // green to yellow
        ['from-purple-600', 'to-blue-700'],   // purple to blue
        ['from-orange-400', 'to-yellow-600'], // orange to yellow
        ['from-cyan-500', 'to-indigo-500'],   // cyan to indigo
        ['from-pink-500', 'to-purple-600'],   // pink to purple
        ['from-teal-600', 'to-blue-600'],     // teal to blue
        ['from-yellow-300', 'to-red-500'],    // yellow to red
        ['from-blue-600', 'to-green-400'],    // blue to green
        ['from-purple-400', 'to-pink-600'],   // purple to pink
        ['from-green-600', 'to-teal-500'],    // green to teal
      ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [gradientFrom, gradientTo] = getRandomGradient();

  return (
    <motion.div
      className="relative w-72 h-96 perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`w-full h-full rounded-2xl shadow-xl transition-all duration-500 preserve-3d ${
          isHovered ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front of the card */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} backface-hidden`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-2xl opacity-80 mix-blend-overlay"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-xl font-semibold">${price.toFixed(2)}</p>
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-black/90 text-white p-6 [transform:rotateY(180deg)] backface-hidden">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">{name}</h3>
              <p className="text-sm mb-4">{description}</p>
            </div>
            <motion.button
              className="w-full py-3 bg-white text-black rounded-full font-bold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;

