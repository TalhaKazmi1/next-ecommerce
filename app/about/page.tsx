'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedNavbar from '@/components/AnimatedNavbar'
import Image from 'next/image'
import { useRef } from 'react'

export default function AboutPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen" ref={ref}>
      <AnimatedNavbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, scale }}
        >
          <motion.h1 
            className="text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to the Future of Shopping
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where Innovation Meets Style
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2023, MyStore has been at the forefront of the e-commerce revolution. 
              We believe in pushing the boundaries of what's possible in online shopping, 
              bringing you the most innovative products from across the galaxy.
            </p>
            <p className="text-gray-300">
              Our mission is to provide an out-of-this-world shopping experience that 
              combines cutting-edge technology with unparalleled customer service.
            </p>
          </motion.div>
          <motion.div
            className="relative h-64 md:h-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image
              src="/cart.webp"
              alt="Futuristic store"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", icon: "💡", description: "Constantly pushing the boundaries of what's possible in e-commerce." },
              { title: "Quality", icon: "🌟", description: "Curating only the finest products from across the universe." },
              { title: "Customer-Centric", icon: "🤝", description: "Your satisfaction is our top priority, always." }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-800 p-6 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

