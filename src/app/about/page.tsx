'use client';

import React, { useState } from 'react';
import ViewSelector from './components/ViewSelector';
import AboutUsView from './views/AboutUsView';
import CompanyHistoryView from './views/CompanyHistoryView';
import CaseStudiesView from './views/CaseStudiesView';
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
      case 'Case Studies':
        return <CaseStudiesView />;
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
