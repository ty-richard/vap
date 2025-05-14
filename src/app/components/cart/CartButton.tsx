'use client'

import { useState, useEffect } from 'react'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { dm_sans } from '@/app/fonts'
import clsx from 'clsx'
import { Cart, CartItem } from '@/types/cartTypes'
import { pb } from '@/lib/pocketbase'
import { Product } from '@/types/productTypes'

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [products, setProducts] = useState<Record<string, Product>>({})
  const [showQuantityFeedback, setShowQuantityFeedback] = useState<string | null>(null)
  const [quantityRemoved, setQuantityRemoved] = useState(0)
  const [isFirstHalf, setIsFirstHalf] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Load initial cart state
    const loadCart = () => {
      const cartJson = localStorage.getItem('cart');
      if (cartJson) {
        const cartData = JSON.parse(cartJson);
        setCart(cartData);
        
        // Fetch product details for all items in cart
        cartData.items.forEach(async (item: CartItem) => {
          if (!products[item.id]) {
            try {
              const record = await pb.collection('products').getOne(item.id);
              const product: Product = {
                id: record.id,
                name: record.name,
                base_price: record.base_price,
                case_per_pallet: record.case_per_pallet,
                case_size: record.case_size,
                categories: record.categories,
                collectionId: record.collectionId,
                collectionName: record.collectionName,
                created: record.created,
                description: record.description,
                image: pb.files.getURL(record, record.image),
                sku: record.sku,
                updated: record.updated,
                variations: record.variations
              };
              setProducts(prev => ({ ...prev, [item.id]: product }));
              // Initialize isFirstHalf state for this product
              setIsFirstHalf(prev => ({ ...prev, [item.id]: true }));
            } catch (error) {
              console.error('Error fetching product:', error);
            }
          }
        });
      }
    };

    loadCart();

    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = (itemId: string) => {
    const product = products[itemId];
    if (!product) {
      // If product details aren't loaded yet, just remove 1
      const updatedCart = {
        items: cart.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: Math.max(0, item.quantity - 1)
            };
          }
          return item;
        }).filter(item => item.quantity > 0)
      };
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));
      return;
    }

    const updatedCart = {
      items: cart.items.map(item => {
        if (item.id === itemId) {
          let quantityToRemove = 1;
          
          if (product.case_per_pallet > 1) {
            const halfCase = Math.ceil(product.case_per_pallet / 2);
            quantityToRemove = isFirstHalf[itemId] ? halfCase : (product.case_per_pallet - halfCase);
            setIsFirstHalf(prev => ({ ...prev, [itemId]: !prev[itemId] }));
          }

          // Show quantity feedback
          setQuantityRemoved(quantityToRemove);
          setShowQuantityFeedback(itemId);
          setTimeout(() => setShowQuantityFeedback(null), 1500);

          const newQuantity = Math.max(0, item.quantity - quantityToRemove);
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      }).filter(item => item.quantity > 0)
    };
    
    // Update cart immediately
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Add console logs for debugging
  useEffect(() => {
    console.log('Current cart state:', cart);
    console.log('Current products state:', products);
  }, [cart, products]);

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
                <div key={item.id} className="flex items-center gap-2 mb-3 pb-3 border-b relative">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className={clsx(dm_sans.className, "text-sm font-medium text-navy")}>{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    {products[item.id]?.case_per_pallet > 1 && (
                      <p className="text-xs text-gray-500">
                        Case per Pallet: {products[item.id].case_per_pallet}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    {showQuantityFeedback === item.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-mint text-navy px-2 py-1 rounded text-xs animate-fade-up whitespace-nowrap">
                        -{quantityRemoved} removed
                        {products[item.id]?.case_per_pallet > 1 && (
                          <span className="ml-1">
                            ({isFirstHalf[item.id] ? 'second half' : 'first half'} of case)
                          </span>
                        )}
                      </div>
                    )}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 