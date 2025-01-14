'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const { isAuthenticated } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${apiUrl}/products`, { name, description, price ,stock}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    alert('Product created successfully!');
  };

  if (!isAuthenticated) {
    return <p className="text-red-500 text-center mt-4">Access denied</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Stock</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
