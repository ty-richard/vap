'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { inter } from '@/app/fonts'
import Image from "next/image"
import clsx from 'clsx'
import SignInForm from '@/app/components/forms/signinform'
import CartButton from '@/app/components/cart/CartButton'
import SearchBar from '@/app/components/search/SearchBar'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <nav className="bg-light px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-navy hover:text-gray-300">
          <Image 
            src="/static/icons/veterans-alliance-partners_logo.png"
            alt="xplorist logo"
            width={50}
            height={12}
            priority
          />
        </Link>
        
        <SearchBar />

        <div className="flex items-center gap-4">
          <CartButton />
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
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
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
