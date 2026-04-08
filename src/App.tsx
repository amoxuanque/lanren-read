import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { MapDetail } from './pages/MapDetail';
import { MyShelf } from './pages/MyShelf';
import { GenerationCenter } from './pages/GenerationCenter';

function AppContent() {
  const { currentPage } = useApp();

  return (
    <Layout>
      {currentPage === 'home' && <Home />}
      {currentPage === 'search' && <SearchResults />}
      {currentPage === 'map' && <MapDetail />}
      {currentPage === 'shelf' && <MyShelf />}
      {currentPage === 'gen' && <GenerationCenter />}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
