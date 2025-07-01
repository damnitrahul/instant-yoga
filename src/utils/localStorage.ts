import {FilterState} from '../types/yoga';

const FILTERS_KEY = 'yoga-app-filters';

export const saveFilters = (filters: FilterState): void => {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error('Failed to save filters to localStorage:', error);
  }
};

export const loadFilters = (): FilterState => {
  try {
    const saved = localStorage.getItem(FILTERS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load filters from localStorage:', error);
  }

  // Return default filters if nothing saved or error occurred
  return {
    categories: [],
    difficulties: []
  };
};
