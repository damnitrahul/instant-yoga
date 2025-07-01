'use client';

import Image from 'next/image';
import {YogaPose} from '../types/yoga';
import {cn} from '../utils/helpers';

interface PoseCardProps {
  pose: YogaPose;
  onClick: (poseId: number) => void;
}

export default function PoseCard({pose, onClick}: PoseCardProps) {
  const getDifficultyColor = (level: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold border';

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

  return (
    <div
      onClick={() => onClick(pose.id)}
      className="yoga-card cursor-pointer group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <Image
          src={pose.images.svg}
          alt={pose.english_name}
          width={120}
          height={120}
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {pose.difficulties.map((difficulty) => (
            <span
              key={difficulty.id}
              className={getDifficultyColor(difficulty.level)}
            >
              {difficulty.level}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {pose.english_name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-medium">
          {pose.sanskrit_name_adapted}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {pose.categories.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
            >
              {category.name}
            </span>
          ))}
          {pose.categories.length > 2 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
              +{pose.categories.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
