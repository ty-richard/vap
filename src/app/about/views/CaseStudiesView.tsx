import React from 'react';
import { dm_sans, inter } from '@/app/fonts';
import Image from 'next/image';
import caseStudies from '@/data/case-studies.json';

export default function CaseStudiesView() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className={`${dm_sans.className} text-4xl font-bold text-navy text-center mb-12`}>
        Case Studies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <div 
            key={index}
            className="border border-navy rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={study.image}
                alt={study.headline}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <a 
                href="#" 
                className={`${dm_sans.className} text-xl font-bold text-navy hover:text-navy/80 transition-colors duration-300 block mb-4`}
              >
                {study.headline}
              </a>
              <p className={`${inter.className} text-navy`}>
                {study.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 