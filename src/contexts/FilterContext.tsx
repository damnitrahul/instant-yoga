'use client';

import {createContext, useContext, useState, useEffect} from 'react';
import {FilterState} from '../types/yoga';
import {saveFilters, loadFilters} from '../utils/localStorage';

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({children}: {children: React.ReactNode}) {
  const [filters, setFiltersState] = useState<FilterState>({
    categories: [],
    difficulties: []
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = loadFilters();
    setFiltersState(savedFilters);
  }, []);

  const setFilters = (newFilters: FilterState) => {
    setFiltersState(newFilters);
    saveFilters(newFilters);
  };

  return (
    <FilterContext.Provider value={{filters, setFilters}}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
