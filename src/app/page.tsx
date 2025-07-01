'use client';

import {useFilters} from '../contexts/FilterContext';
import {getYogaData} from '../utils/yogaData';
import RandomPose from '../components/RandomPose';

export default function HomePage() {
  const {filters} = useFilters();
  const yogaData = getYogaData();

  return <RandomPose poses={yogaData.poses} filters={filters} />;
}
