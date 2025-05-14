import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { pb } from '@/lib/pocketbase'
import { Product } from '@/types/productTypes'
import Link from 'next/link'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([])
        return
      }

      try {
        const productRecords = await pb.collection('products').getList(1, 200, {
          filter: `name ~ "${searchTerm}" || description ~ "${searchTerm}" || sku ~ "${searchTerm}"`
        })

        const fetchedProducts = productRecords.items.map(record => ({
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
        }))

        setSearchResults(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchProducts()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div className="flex-1 max-w-xl mx-8 relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="What are you looking for?"
        className="w-full px-4 py-2 rounded-lg border-2 border-navy focus:outline-none focus:border-mint"
      />
      <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy" />
      
      {searchResults.length > 0 && searchTerm.length >= 3 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product?id=${product.id}`}
              className="flex items-center p-3 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSearchTerm('')
                setSearchResults([])
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-contain mr-3"
              />
              <div>
                <p className="font-semibold text-navy">{product.name}</p>
                <p className="text-sm text-gray-600">${product.base_price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 