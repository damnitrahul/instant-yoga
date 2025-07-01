'use client';

import {useState, useEffect, useCallback} from 'react';
import {Shuffle} from 'lucide-react';
import {YogaPose, FilterState} from '../types/yoga';
import {getFilteredPoses, getRandomPose} from '../utils/yogaData';
import PoseDetail from './PoseDetail';

interface RandomPoseProps {
  poses: YogaPose[];
  filters: FilterState;
}

export default function RandomPose({poses, filters}: RandomPoseProps) {
  const [currentPose, setCurrentPose] = useState<YogaPose | null>(null);

  const generateRandomPose = useCallback(() => {
    const filteredPoses = getFilteredPoses(poses, filters);
    const randomPose = getRandomPose(filteredPoses);
    setCurrentPose(randomPose);
  }, [poses, filters]);

  // Generate initial random pose
  useEffect(() => {
    generateRandomPose();
  }, [generateRandomPose]);

  if (!currentPose) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-gray-500 text-lg">
          Loading your perfect pose...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto lg:px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Discover Your Next Pose
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find inspiration with a randomly selected yoga pose tailored to your
            preferences
          </p>
        </div>
        {/* Re-roll Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={generateRandomPose}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <Shuffle
              className="mr-3 group-hover:rotate-180 transition-transform duration-300"
              size={20}
            />
            Get Another Pose
          </button>
        </div>
        {/* Pose Detail */}
        <PoseDetail pose={currentPose} />

        {/* Filter Info */}
        {(filters.categories.length > 0 || filters.difficulties.length > 0) && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-purple-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
              <p className="text-sm text-gray-600">
                Showing poses based on your filters •{' '}
                <span className="font-semibold text-purple-600">
                  {getFilteredPoses(poses, filters).length} poses available
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
