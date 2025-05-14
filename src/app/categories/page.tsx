'use client'

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/productTypes';
import { dm_sans, inter } from '@/app/fonts';
import { pb } from '@/lib/pocketbase';
import { formatDescription } from '@/utils/helpers';
import Link from 'next/link';

function CategoryContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const categoryName = searchParams.get('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRecords = await pb.collection('products').getList(1, 200);
        const fetchedProducts = productRecords.items
          .map(record => ({
            id: record.id,
            name: record.name,
            base_price: record.base_price,
            case_per_pallet: record.case_per_pallet,
            case_size: record.case_size,
            categories: Array.isArray(record.categories) ? record.categories : [record.categories],
            collectionId: record.collectionId,
            collectionName: record.collectionName,
            created: record.created,
            updated: record.updated,
            description: record.description,
            image: pb.files.getURL(record, record.image),
            sku: record.sku
          }))
          .filter(product => {
            return product.categories.includes(id);
          });

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-8 text-navy">
      <h1 className={`text-2xl font-bold mb-6 ${dm_sans.className}`}>
        {`${categoryName} Products`}
      </h1>
      <nav className="mb-4">
        <ol className={`flex items-center space-x-2 ${inter.className}`}>
          <li>
            <Link href="/" className="text-navy hover:text-sage">Home</Link>
          </li>
        </ol>
      </nav>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${inter.className}`}>
        {products.map((product) => (
          <a 
            href={`/product?id=${product.id}&categoryId=${id}&categoryName=${encodeURIComponent(categoryName || '')}`} 
            key={product.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="border rounded-lg p-4 shadow-sm">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className={`text-xl text-navy font-semibold mb-2 ${dm_sans.className}`}>{product.name}</h2>
              <p className="text-navy mb-2">
                {formatDescription(product.description)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-navy font-bold">${product.base_price}</span>
                <span className="text-sm text-navy">Case Size: {product.case_size}</span>
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
