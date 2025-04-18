'use client';

import React, { useState } from 'react';
import ViewSelector from './components/ViewSelector';
import AboutUsView from './views/AboutUsView';
import CompanyHistoryView from './views/CompanyHistoryView';
import NewsletterView from './views/NewsletterView';
import GovernmentServicesView from './views/GovernmentServicesView';
import CatalogView from './views/CatalogView';

export default function AboutPage() {
  const [currentView, setCurrentView] = useState('About Us');

  const renderView = () => {
    switch (currentView) {
      case 'About Us':
        return <AboutUsView />;
      case 'Company History':
        return <CompanyHistoryView />;
      case 'Newsletter':
        return <NewsletterView />;
      case 'Government Services':
        return <GovernmentServicesView />;
      case 'Catalog':
        return <CatalogView />;
      default:
        return <AboutUsView />;
    }
  };

  return (
    <main className="container mx-auto mt-8 mb-4">
      <ViewSelector 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {renderView()}
    </main>
  );
}
