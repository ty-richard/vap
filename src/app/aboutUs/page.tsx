'use client';

import React, { useState } from 'react';
import ViewSelector from './components/ViewSelector';
import AboutUsView from './components/views/AboutUsView';
import CaseStudiesView from './components/views/CaseStudiesView';
import GovernmentServicesView from './components/views/GovernmentServicesView';
import CatalogPDFView from './components/views/CatalogPDFView';

export default function AboutUsPage() {
  const [currentView, setCurrentView] = useState('About Us');

  const renderView = () => {
    switch (currentView) {
      case 'About Us':
        return <AboutUsView />;
      case 'Case Studies':
        return <CaseStudiesView />;
      case 'Government Services':
        return <GovernmentServicesView />;
      case 'Catalog PDF':
        return <CatalogPDFView />;
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
