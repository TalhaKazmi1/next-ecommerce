'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import AnimatedNavbar from '@/components/AnimatedNavbar'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const deals = [
  { name: 'Cosmic Headphones', discount: 30, price: 69.99, image: '/cosmic.avif' },
  { name: 'Nebula Smartwatch', discount: 25, price: 149.99, image: '/watch.webp' },
  { name: 'Quantum Laptop', discount: 20, price: 899.99, image: '/laptop1.jpg' },
  { name: 'Gravity Defying Sneakers', discount: 40, price: 79.99, image: '/sneakers.webp' },
  { name: 'Holographic Display', discount: 15, price: 299.99, image: '/holo.webp' },
  { name: 'Time Warp Clock', discount: 35, price: 49.99, image: '/clock.jpg' },
]

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <AnimatedNavbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Out of This World Deals
        </motion.h1>
        <motion.div 
          className="text-2xl font-bold text-center text-yellow-400 mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Time Left: {formatTime(timeLeft)}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <DealCard key={deal.name} deal={deal} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}

function DealCard({ deal, index }: { deal: typeof deals[0], index: number }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative">
        <Image
          src={deal.image}
          alt={deal.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 m-2 rounded-md">
          {deal.discount}% OFF
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{deal.name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 line-through">${(deal.price / (1 - deal.discount / 100)).toFixed(2)}</span>
          <span className="text-2xl font-bold text-green-400">${deal.price.toFixed(2)}</span>
        </div>
        <motion.button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

