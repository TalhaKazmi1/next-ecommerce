'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedNavbar from '@/components/AnimatedNavbar'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Electronics', icon: '🚀', color: 'from-blue-500 to-purple-600' },
  { name: 'Clothing', icon: '👕', color: 'from-green-500 to-teal-600' },
  { name: 'Books', icon: '📚', color: 'from-yellow-500 to-red-600' },
  { name: 'Home & Garden', icon: '🏡', color: 'from-pink-500 to-rose-600' },
  { name: 'Sports', icon: '⚽', color: 'from-indigo-500 to-blue-600' },
  { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-pink-600' },
]

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <AnimatedNavbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Galactic Categories
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredCategory(category.name)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Link href={`/categories/${category.name.toLowerCase()}`}>
                <div className={`bg-gradient-to-br ${category.color} p-8 h-64 flex flex-col justify-between`}>
                  <motion.div
                    className="text-6xl"
                    animate={{ 
                      rotate: hoveredCategory === category.name ? 360 : 0,
                      scale: hoveredCategory === category.name ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                </div>
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0"
                  animate={{ opacity: hoveredCategory === category.name ? 1 : 0 }}
                >
                  <p className="text-white text-lg font-semibold">Explore {category.name}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

