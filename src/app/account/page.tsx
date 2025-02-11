'use client';

import AccountSubmenu from './components/accountSubmenu';
import Profile from './components/profile';
import Security from './components/security';
import Billing from './components/billing';
import { useState } from 'react';
import { MenuOption } from '@/types/accountTypes';

export default function AccountPage() {
  const [activeOption, setActiveOption] = useState<MenuOption>('profile');

  const renderContent = () => {
    switch (activeOption) {
      case 'security':
        return <Security />;
      case 'billing':
        return <Billing />;
      case 'profile':
      default:
        return <Profile />;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:border-r md:border-navy pr-8">
          <AccountSubmenu
            activeOption={activeOption}
            setActiveOption={setActiveOption}
          />
        </div>
        <div className="md:col-span-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
