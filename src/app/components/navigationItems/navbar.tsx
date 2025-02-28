'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { dm_sans, inter } from '@/app/fonts'
import clsx from 'clsx'
import SignInForm from '@/app/components/forms/signinform'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount] = useState(0)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <nav className="bg-light px-4 py-3">
      <div className="flex items-center justify-between">
        <span className={clsx(dm_sans.className, "text-navy font-bold text-2xl")}>
          VAP
        </span>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-navy hover:opacity-80 relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-mint text-navy rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </button>
            {isCartOpen && (
              <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg py-2 w-64">
                {cartCount === 0 ? (
                  <p className={clsx(dm_sans.className, "text-navy px-4 py-2 text-center")}>
                    Your shopping cart is empty
                  </p>
                ) : (
                  <div className="px-4 py-2">
                    {/* Cart items content */}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-mint rounded-full" />
            <button 
              onClick={() => setIsSignInOpen(true)}
              className="border-2 border-navy text-navy px-4 py-2 rounded-lg hover:bg-navy hover:text-light transition-colors"
            >
              SIGN IN
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-navy hover:opacity-80"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg py-2 w-48">
          <ul className={clsx(inter.className, "text-navy")}>
            {[
              { name: 'Home', href: '/' },
              { name: 'Orders', href: '/orders' },
              { name: 'Account', href: '/account' },
              { name: 'Sign Out', href: '/signout' },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isSignInOpen && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center p-4 z-50">
          <div className="bg-light w-full max-w-lg rounded-xl">
            <SignInForm onClose={() => setIsSignInOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}
