'use client';

import {X} from 'lucide-react';
import {FilterState, YogaCategory, YogaDifficulty} from '../types/yoga';
import {cn} from '../utils/helpers';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  categories,
  difficulties
}: FilterDrawerProps) {
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId);

    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleDifficultyChange = (difficultyId: number, checked: boolean) => {
    const updatedDifficulties = checked
      ? [...filters.difficulties, difficultyId]
      : filters.difficulties.filter((id) => id !== difficultyId);

    onFilterChange({
      ...filters,
      difficulties: updatedDifficulties
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      difficulties: []
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.difficulties.length > 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-500 to-indigo-600">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full mb-6 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-200"
              >
                Clear All Filters
              </button>
            )}

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white p-3 rounded-xl transition-all duration-200 group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={(e) =>
                        handleCategoryChange(category.id, e.target.checked)
                      }
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulties */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Difficulty
              </h3>
              <div className="space-y-3">
                {difficulties.map((difficulty) => (
                  <label
                    key={difficulty.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white p-3 rounded-xl transition-all duration-200 group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.difficulties.includes(difficulty.id)}
                      onChange={(e) =>
                        handleDifficultyChange(difficulty.id, e.target.checked)
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {difficulty.level}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
