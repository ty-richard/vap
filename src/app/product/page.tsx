'use client'

import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
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
  const [isFirstHalf, setIsFirstHalf] = useState(true);
  const [showQuantityFeedback, setShowQuantityFeedback] = useState(false);
  const [quantityAdded, setQuantityAdded] = useState(0);
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
    
    // Calculate quantity to add based on case_per_pallet
    let quantityToAdd = 1;
    if (product.case_per_pallet > 1) {
      const halfCase = Math.ceil(product.case_per_pallet / 2);
      quantityToAdd = isFirstHalf ? halfCase : (product.case_per_pallet - halfCase);
      setIsFirstHalf(!isFirstHalf);
    }

    // Show quantity feedback
    setQuantityAdded(quantityToAdd);
    setShowQuantityFeedback(true);
    setTimeout(() => setShowQuantityFeedback(false), 1500);
    
    if (existingItem) {
      existingItem.quantity += quantityToAdd;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.base_price,
        image: product.image,
        quantity: quantityToAdd
      });
      // Only toggle isFirstHalf if we're starting a new item and case_per_pallet > 1
      if (product.case_per_pallet > 1) {
        setIsFirstHalf(false);
      }
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
          {categoryId && categoryName && (
            <li className="flex items-center space-x-2">
              <span className="text-navy">/</span>
              <Link 
                href={`/categories?id=${categoryId}&name=${encodeURIComponent(categoryName)}`} 
                className="text-navy hover:text-sage"
              >
                {`${categoryName} Products`}
              </Link>
            </li>
          )}
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
            {product.case_per_pallet > 1 && (
              <div className="mb-6 flex items-center">
                <p className="text-sm text-gray-600">
                  Case per Pallet: {product.case_per_pallet} units
                </p>
                <div className="ml-2 relative">
                  <div className="group">
                    <InformationCircleIcon className="h-5 w-5 text-navy cursor-help" />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-navy text-white text-xs rounded p-2 z-50">
                      <div className="relative">
                        <p className="font-medium mb-1">Adding to cart in case quantities:</p>
                        <ul className="list-disc list-inside">
                          <li>First click: {Math.ceil(product.case_per_pallet / 2)} units (first half)</li>
                          <li>Second click: {product.case_per_pallet - Math.ceil(product.case_per_pallet / 2)} units (second half)</li>
                        </ul>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            {showQuantityFeedback && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-mint text-navy px-4 py-2 rounded-lg shadow-lg animate-fade-up">
                <p className={`${dm_sans.className} font-bold`}>
                  +{quantityAdded} added to cart
                  {product.case_per_pallet > 1 && (
                    <span className="text-sm font-normal ml-1">
                      ({isFirstHalf ? 'second half' : 'first half'} of case)
                    </span>
                  )}
                </p>
              </div>
            )}
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
