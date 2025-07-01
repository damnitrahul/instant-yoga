'use client';

import {useRouter} from 'next/navigation';
import {useFilters} from '../../contexts/FilterContext';
import {getYogaData, getFilteredPoses} from '../../utils/yogaData';
import PoseCard from '../../components/PoseCard';

export default function AllPosesPage() {
  const router = useRouter();
  const {filters} = useFilters();
  const yogaData = getYogaData();

  const filteredPoses = getFilteredPoses(yogaData.poses, filters);

  const handlePoseClick = (poseId: number) => {
    router.push(`/all/${poseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            All Yoga Poses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our complete collection of yoga poses and find the perfect
            practice for you
          </p>

          {/* Filter Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-purple-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-700">
                Showing{' '}
                <span className="text-purple-600 font-bold">
                  {filteredPoses.length}
                </span>{' '}
                of{' '}
                <span className="text-gray-900 font-bold">
                  {yogaData.poses.length}
                </span>{' '}
                poses
              </span>
            </div>
            {(filters.categories.length > 0 ||
              filters.difficulties.length > 0) && (
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full border border-purple-200">
                <span className="text-sm font-semibold text-purple-700">
                  Filters applied
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredPoses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPoses.map((pose) => (
              <PoseCard key={pose.id} pose={pose} onClick={handlePoseClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🧘‍♀️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No poses found
              </h3>
              <p className="text-gray-600 mb-6">
                No poses match your current filters. Try adjusting your filters
                to discover more poses.
              </p>
              <div className="text-sm text-gray-500">
                Clear your filters or try different combinations to see our full
                collection
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
