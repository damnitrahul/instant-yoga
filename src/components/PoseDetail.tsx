'use client';

import Image from 'next/image';
import {Play} from 'lucide-react';
import {YogaPose} from '../types/yoga';
import {cn} from '../utils/helpers';

interface PoseDetailProps {
  pose: YogaPose;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function PoseDetail({
  pose,
  showBackButton = false,
  onBack
}: PoseDetailProps) {
  const getDifficultyColor = (level: string) => {
    const baseClasses = 'px-4 py-2 rounded-full text-sm font-semibold border';

    switch (level.toLowerCase()) {
      case 'beginner':
        return cn(
          baseClasses,
          'bg-emerald-100 text-emerald-700 border-emerald-200'
        );
      case 'intermediate':
        return cn(baseClasses, 'bg-amber-100 text-amber-700 border-amber-200');
      case 'expert':
        return cn(baseClasses, 'bg-rose-100 text-rose-700 border-rose-200');
      default:
        return cn(baseClasses, 'bg-gray-100 text-gray-700 border-gray-200');
    }
  };

  const getYouTubeSearchUrl = () => {
    const query = `${pose.english_name} ${pose.sanskrit_name_adapted} yoga pose tutorial`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;
  };

  const handleWatchVideo = () => {
    window.open(getYouTubeSearchUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="yoga-card overflow-hidden">
        {/* Image */}
        <div className="relative py-8 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
          <Image
            src={pose.images.svg}
            alt={pose.english_name}
            width={350}
            height={350}
            className="object-contain drop-shadow-lg max-w-full"
            priority
          />
        </div>

        {/* Content */}
        <div className="py-8 px-4 lg:px-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              {pose.english_name}
            </h1>
            <p className="text-xl text-gray-600 mb-2 font-medium">
              {pose.sanskrit_name_adapted}
            </p>
            <p className="text-sm text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg inline-block">
              {pose.translation_name}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Difficulty badges */}
            {pose.difficulties.map((difficulty) => (
              <span
                key={difficulty.id}
                className={getDifficultyColor(difficulty.level)}
              >
                {difficulty.level}
              </span>
            ))}

            {/* Category badges */}
            {pose.categories.map((category) => (
              <span
                key={category.id}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Watch Video Button */}
          <div className="mb-8">
            <button
              onClick={handleWatchVideo}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Play size={20} className="fill-current" />
              <span className="text-base">Watch Video Tutorial on YouTube</span>
            </button>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-3"></span>
              Description
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {pose.description}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></span>
              Benefits
            </h2>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {pose.benefits}
              </p>
            </div>
          </div>

          {/* Back Button */}
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Poses
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
