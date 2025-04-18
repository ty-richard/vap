import React from 'react';
import { dm_sans } from '@/app/fonts';

export default function CatalogView() {
  return (
    <div className="text-center py-12">
      <h2 className={`${dm_sans.className} text-4xl font-bold text-navy mb-6`}>
        Catalog
      </h2>
      <a 
        href="https://vetalliancepartners.com/wp-content/uploads/2024/07/2024_VAP_Catalog_DF.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${dm_sans.className} text-xl text-blue-600 hover:text-blue-800 underline cursor-pointer`}
      >
        View Catalog
      </a>
    </div>
  );
} 