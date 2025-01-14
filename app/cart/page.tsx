'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import AnimatedNavbar from '@/components/AnimatedNavbar'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setIsLoading(true)
    const stripe = await stripePromise

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    })

    const session = await response.json()

    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.error(result.error.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <AnimatedNavbar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-white">Your cart is empty.</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-l"
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-r"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 text-right">
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-right">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

