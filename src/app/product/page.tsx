'use client'

import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { dm_sans, inter } from '@/app/fonts';
import { Suspense, useState, useEffect } from 'react';
import { Product } from '@/types/productTypes';
import { pb } from '@/lib/pocketbase';

function ProductContent() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

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

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

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
            <p className="mb-4">{product.description}</p>
            <p className="mb-6">Case Size: {product.case_size}</p>
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
