import {YogaPose, FilterState} from '../types/yoga';

export const applyFilters = (
  poses: YogaPose[],
  filters: FilterState
): YogaPose[] => {
  let filteredPoses = poses;

  // Filter by categories
  if (filters.categories.length > 0) {
    filteredPoses = filteredPoses.filter((pose) =>
      pose.categories.some((category) =>
        filters.categories.includes(category.id)
      )
    );
  }

  // Filter by difficulties
  if (filters.difficulties.length > 0) {
    filteredPoses = filteredPoses.filter((pose) =>
      pose.difficulties.some((difficulty) =>
        filters.difficulties.includes(difficulty.id)
      )
    );
  }

  return filteredPoses;
};

export const getDefaultFilters = (): FilterState => {
  return {
    categories: [],
    difficulties: []
  };
};
