'use client';

import { MenuOption } from '@/types/accountTypes';
import { dm_sans } from '@/app/fonts';

interface AccountSubmenuProps {
  activeOption: MenuOption;
  setActiveOption: React.Dispatch<React.SetStateAction<MenuOption>>;
}

export default function AccountSubmenu({ activeOption, setActiveOption }: AccountSubmenuProps) {
  const menuOptions: MenuOption[] = ['profile', 'security', 'billing'];

  return (
    <div className="w-full">
      <h2 className={`text-xl font-semibold font-center text-navy mb-4 ${dm_sans.className}`}>
        My Account
      </h2>
      <div className="flex flex-col space-y-2">
        {menuOptions.map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option)}
            className={`
              text-left p-2 rounded text-navy 
              ${dm_sans.className} 
              transition-colors 
              ${activeOption === option ? 'bg-skyBlue' : 'hover:bg-gray-50'}
            `}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
