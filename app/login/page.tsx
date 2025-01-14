'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect or show success message
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
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
          <h1 className="text-3xl font-extrabold mb-6">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot your password?
                </a>
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
            >
              Sign In
            </motion.button>
          </form>
          <p className="mt-8 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/bgl.jpg')" }}>
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back to Roronoa Zoro</h2>
            <p className="text-xl">Sign in to access your account and start shopping!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

