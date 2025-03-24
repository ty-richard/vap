'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/baseTypes';
import { dm_sans } from '@/app/fonts';
import { pb } from '@/lib/pocketbase';

const DropdownMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryRecords = await pb.collection('categories').getList(1, 20);
        const fetchedCategories = categoryRecords.items.map(record => ({
          id: record.id,
          collectionId: record.collectionId,
          collectionName: record.collectionName,
          name: record.name,
          slug: record.slug,
          description: record.description,
          category_img: record.category_img,
          created: record.created,
          updated: record.updated
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className={`w-full bg-[#001f3f] ${dm_sans.className} z-10`}>
      <ul className="flex justify-center items-center">
        {categories.map((category: Category) => (
          <li
            key={category.id}
            className="relative"
          >
            <button
              onClick={() => router.push(`/categories?id=${category.id}`)}
              className="px-6 py-4 text-gray-100 hover:bg-[#003366] transition-colors"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
