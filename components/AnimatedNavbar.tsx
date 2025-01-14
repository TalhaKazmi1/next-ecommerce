'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { ShoppingCart } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const menuItems = [
  { name: 'Home', href: '/store' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'About', href: '/about' },
]

export default function AnimatedNavbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { logout } = useAuth()
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0))

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/store" className="flex-shrink-0">
              <span className="text-xl font-bold">MyStore</span>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.name}
                  </Link>
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

