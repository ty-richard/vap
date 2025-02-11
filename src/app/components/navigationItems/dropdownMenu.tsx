'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/dropdownTypes';
import { dm_sans } from '@/app/fonts';
import data from '@/data/dropdownData.json';

const DropdownMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const router = useRouter();

  const handleSubcategoryClick = (subcategory: string) => {
    router.push(`/categories?category=${encodeURIComponent(subcategory.toLowerCase())}`);
  };

  return (
    <nav className={`w-full bg-[#001f3f] ${dm_sans.className} z-50`}>
      <ul className="flex justify-center items-center">
        {data.categories.map((category: Category) => (
          <li
            key={category.id}
            className="relative"
            onMouseEnter={() => setActiveDropdown(category.id)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="px-6 py-4 text-gray-100 hover:bg-[#003366] transition-colors"
            >
              {category.name}
            </button>
            {activeDropdown === category.id && (
              <ul className="absolute left-0 w-64 bg-[#001f3f] shadow-lg z-50">
                {category.subcategories.map((sub, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubcategoryClick(sub);
                      }}
                      className="block px-6 py-3 text-gray-100 hover:bg-[#003366] transition-colors"
                    >
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
