import {YogaDatabase, YogaPose, FilterState} from '../types/yoga';
import yogaData from '../data/yoga_database.json';

export const getYogaData = (): YogaDatabase => {
  return yogaData as YogaDatabase;
};

export const getPoseById = (id: number): YogaPose | undefined => {
  const data = getYogaData();
  return data.poses.find((pose) => pose.id === id);
};

export const getFilteredPoses = (
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

export const getRandomPose = (poses: YogaPose[]): YogaPose => {
  if (poses.length === 0) {
    // Return first pose if no poses available (fallback)
    const data = getYogaData();
    return data.poses[0];
  }

  const randomIndex = Math.floor(Math.random() * poses.length);
  return poses[randomIndex];
};
