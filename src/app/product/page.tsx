'use client'

import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import data from '@/data/paperProductsData.json';
import { dm_sans, inter } from '@/app/fonts';
import { Suspense } from 'react';

function ProductContent() {
  const searchParams = useSearchParams();
  const sku = searchParams.get('sku');
  const product = data.paperProducts.find(p => p.productSKU === sku);

  if (!product) {
    return <div className="container mx-auto p-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className={`${dm_sans.className} text-3xl font-bold text-navy mb-4`}>
            {product.productName}
          </h1>
          
          <div className={`${inter.className} text-navy mb-6`}>
            <p className="text-xl font-bold mb-2">${product.price}</p>
            <p className="text-lg mb-4">SKU: {product.productSKU}</p>
            <p className="mb-4">{product.productDescription}</p>
            <p className="mb-6">Quantity in stock: {product.quantity}</p>
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-3 text-navy border-2 border-navy bg-mint rounded-lg hover:bg-sage transition-colors">
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
