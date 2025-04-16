'use client'

import { useState, useEffect } from 'react'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { dm_sans } from '@/app/fonts'
import clsx from 'clsx'
import { Cart } from '@/types/cartTypes'

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<Cart>({ items: [] })

  useEffect(() => {
    // Load initial cart state
    const loadCart = () => {
      const cartJson = localStorage.getItem('cart');
      if (cartJson) {
        setCart(JSON.parse(cartJson));
      }
    };

    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = (itemId: string) => {
    const updatedCart = {
      items: cart.items.map(item => {
        if (item.id === itemId) {
          // Decrease quantity by 1
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove items with quantity 0
    };
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
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
        <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50">
          {cartCount === 0 ? (
            <p className={clsx(dm_sans.className, "text-navy px-4 py-2 text-center")}>
              Your shopping cart is empty
            </p>
          ) : (
            <div className="px-4 py-2 max-h-96 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 mb-3 pb-3 border-b">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className={clsx(dm_sans.className, "text-sm font-medium text-navy")}>{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 