'use client'

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaperProduct } from '@/types/paperProductsTypes';
import data from '@/data/paperProductsData.json';
import { dm_sans, inter } from '@/app/fonts';

// Create a separate component for the content that uses useSearchParams
function CategoryContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const products: PaperProduct[] = data.paperProducts;

  return (
    <div className="container mx-auto p-8 text-navy">
      <h1 className={`text-2xl font-bold mb-6 ${dm_sans.className}`}>
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
      </h1>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${inter.className}`}>
        {products.map((product) => (
          <a 
            href={`/product?sku=${product.productSKU}`} 
            key={product.productSKU} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="border rounded-lg p-4 shadow-sm">
              <img 
                src={product.image} 
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className={`text-xl font-semibold mb-2 ${dm_sans.className}`}>{product.productName}</h2>
              <p className="text-gray-600 mb-2">{product.productDescription}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
