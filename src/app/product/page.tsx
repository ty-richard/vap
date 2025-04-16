'use client'

import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { dm_sans, inter } from '@/app/fonts';
import { Suspense, useState, useEffect } from 'react';
import { Product } from '@/types/productTypes';
import { pb } from '@/lib/pocketbase';
import { stripHtmlTags } from '@/utils/helpers';
import { Cart } from '@/types/cartTypes';
import Link from 'next/link';

function ProductContent() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) return;
        const record = await pb.collection('products').getOne(productId);
        setProduct({
          id: record.id,
          name: record.name,
          base_price: record.base_price,
          case_per_pallet: record.case_per_pallet,
          case_size: record.case_size,
          categories: record.categories,
          collectionId: record.collectionId,
          collectionName: record.collectionName,
          created: record.created,
          updated: record.updated,
          description: record.description,
          image: pb.files.getURL(record, record.image),
          sku: record.sku
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartJson = localStorage.getItem('cart');
    const cart: Cart = cartJson ? JSON.parse(cartJson) : { items: [] };
    
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.base_price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    // Trigger a custom event to notify CartButton
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <nav className="mb-4">
        <ol className={`flex items-center space-x-2 ${inter.className}`}>
          <li>
            <Link href="/" className="text-navy hover:text-sage">Home</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-navy">/</span>
            <Link 
              href={`/categories?id=${categoryId}&name=${encodeURIComponent(categoryName || '')}`} 
              className="text-navy hover:text-sage"
            >
              {`${categoryName} Products` || 'Products'}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className={`${dm_sans.className} text-3xl font-bold text-navy mb-4`}>
            {product.name}
          </h1>
          
          <div className={`${inter.className} text-navy mb-6`}>
            <p className="text-xl font-bold mb-2">${product.base_price}</p>
            <p className="text-lg mb-4">SKU: {product.sku}</p>
            <p className="mb-4">{stripHtmlTags(product.description)}</p>
            <p className="mb-6">Case Size: {product.case_size}</p>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 px-6 py-3 text-navy border-2 border-navy bg-mint rounded-lg hover:bg-sage transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span className={`${dm_sans.className} font-bold`}>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className={`${inter.className}`}>
      <Suspense fallback={<div className="container mx-auto p-8">Loading...</div>}>
        <ProductContent />
      </Suspense>
    </div>
  );
}
