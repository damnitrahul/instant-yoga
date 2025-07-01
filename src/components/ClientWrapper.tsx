'use client';

import {useState} from 'react';
import {YogaDatabase} from '../types/yoga';
import {useFilters} from '../contexts/FilterContext';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import FilterDrawer from './FilterDrawer';

interface ClientWrapperProps {
  children: React.ReactNode;
  yogaData: YogaDatabase;
}

export default function ClientWrapper({
  children,
  yogaData
}: ClientWrapperProps) {
  const {filters, setFilters} = useFilters();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const closeFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <>
      <Header onFilterToggle={toggleFilterDrawer} currentFilters={filters} />
      <Navigation />

      <main className="flex-1">{children}</main>

      <Footer />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        filters={filters}
        onFilterChange={setFilters}
        categories={yogaData.categories}
        difficulties={yogaData.difficulties}
      />
    </>
  );
}
