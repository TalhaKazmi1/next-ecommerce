'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import ProductDetailsModal from './ProductDetailsModal'

interface ProductCardProps {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  category: string
  rating: number
  stock: number
}

export default function ProductCard({ id, name, price, description, imageUrl, category, rating, stock }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price }))
  }

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg"
        whileHover={{ scale: 1.05, y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button 
              className="bg-white text-black px-4 py-2 rounded-full font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
            >
              View Details
            </motion.button>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
          <p className="text-gray-300 mb-2 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-400">${price.toFixed(2)}</span>
            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <ProductDetailsModal
          product={{ id, name, price, description, imageUrl, category, rating, stock }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

