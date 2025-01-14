'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Star, ShoppingCart, Heart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

interface ProductDetailsModalProps {
  product: {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: string
    rating: number
    stock: number
  }
  onClose: () => void
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const dispatch = useDispatch()
  const [customRating] = useState(5)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price }))
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl text-white"
        initial={{ scale: 0.9, y: 100, rotateX: -15 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, y: 100, rotateX: 15 }}
        transition={{ type: 'spring', damping: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <motion.button
            className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X size={24} />
          </motion.button>
          <div className="w-full h-96 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="p-4"
            />
          </div>
        </div>
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-blue-400 mb-2">{product.category}</p>
          </motion.div>
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Star
                  size={24}
                  className={i < Math.floor(customRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                />
              </motion.div>
            ))}
         <span className="ml-2 text-gray-300">({customRating.toFixed(1)})</span>
          </motion.div>
          <motion.p
            className={`text-gray-300 mb-6 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {product.description}
          </motion.p>
          <motion.button
            className="text-blue-400 mb-4"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDescriptionExpanded ? 'Read less' : 'Read more'}
          </motion.button>
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-3xl font-bold text-green-400"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, times: [0, 0.5, 1], loop: Infinity, repeatDelay: 5 }}
            >
              ${product.price.toFixed(2)}
            </motion.p>
            <p className="text-sm text-gray-400">{product.stock} in stock</p>
          </motion.div>
          <motion.div className="flex space-x-4">
            <motion.button
              className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold text-lg flex items-center justify-center overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <motion.div
                className="absolute inset-0 bg-blue-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <ShoppingCart size={24} className="mr-2 relative z-10" />
              <span className="relative z-10">Add to Cart</span>
            </motion.button>
            <motion.button
              className="bg-pink-600 text-white py-3 px-4 rounded-full font-bold text-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Heart size={24} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

