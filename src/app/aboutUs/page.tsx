'use client';

import React, { useState } from 'react';
import ViewSelector from './components/ViewSelector';
import AboutUsView from './views/AboutUsView';
import CaseStudiesView from './views/CaseStudiesView';
import GovernmentServicesView from './views/GovernmentServicesView';
import CatalogPDFView from './views/CatalogPDFView';

export default function AboutUsPage() {
  const [currentView, setCurrentView] = useState('About Us');

  const renderView = () => {
    console.log("currentView", currentView);
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
