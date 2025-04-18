import React from 'react';
import { dm_sans } from '@/app/fonts';

interface ViewSelectorProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const views = [
  'About Us',
  'Company History',
  'Newsletter',
  'Government Services',
  'Catalog'
];

export default function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`${dm_sans.className} px-4 py-2 text-lg rounded-full transition-colors
            ${currentView === view 
              ? 'bg-sage text-white' 
              : 'bg-transparent text-navy hover:bg-sage/10'
            }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
} 