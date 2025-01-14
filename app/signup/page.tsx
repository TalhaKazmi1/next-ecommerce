'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', { name, email, password });
      alert('User registered successfully!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center mb-8">
            <Image src="/icon4.webp" alt="Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold">Roronoa Zoro</span>
          </Link>
          <h1 className="text-3xl font-extrabold mb-6">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="********"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="mt-8 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to Roronoa Zoro</h2>
            <p className="text-xl">Discover amazing products and great deals!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
