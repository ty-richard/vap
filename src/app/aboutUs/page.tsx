'use client';

import React, { useState } from 'react';
import ViewSelector from './components/ViewSelector';
import CompanyHistoryView from './views/CompanyHistoryView';
import CaseStudiesView from './views/CaseStudiesView';
import GovernmentServicesView from './views/GovernmentServicesView';
import CatalogPDFView from './views/CatalogPDFView';

export default function AboutUsPage() {
  const [currentView, setCurrentView] = useState('About Us');

  const renderView = () => {
    console.log("currentView", currentView);
    switch (currentView) {
      case 'Company History':
        return <CompanyHistoryView />;
      case 'Case Studies':
        return <CaseStudiesView />;
      case 'Government Services':
        return <GovernmentServicesView />;
      case 'Catalog PDF':
        return <CatalogPDFView />;
      default:
        return <CompanyHistoryView />;
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
