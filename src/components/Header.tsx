'use client';

import {Filter} from 'lucide-react';
import {FilterState} from '../types/yoga';

interface HeaderProps {
  onFilterToggle: () => void;
  currentFilters: FilterState;
}

export default function Header({onFilterToggle, currentFilters}: HeaderProps) {
  const activeFiltersCount =
    currentFilters.categories.length + currentFilters.difficulties.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-1" />
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              🧘‍♀️ Instant Yoga
            </h1>
          </div>

          {/* Filter Button */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={onFilterToggle}
              className="relative p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200 group"
              aria-label="Open filters"
            >
              <Filter size={20} className="transition-transform duration-200" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
