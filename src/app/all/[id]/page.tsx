'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getPoseById} from '../../../utils/yogaData';
import {YogaPose} from '../../../types/yoga';
import PoseDetail from '../../../components/PoseDetail';

interface PosePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PosePage({params}: PosePageProps) {
  const router = useRouter();
  const [pose, setPose] = useState<YogaPose | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPose = async () => {
      try {
        const resolvedParams = await params;
        const poseId = parseInt(resolvedParams.id);
        const foundPose = getPoseById(poseId);

        if (foundPose) {
          setPose(foundPose);
        }
      } catch (error) {
        console.error('Error loading pose:', error);
      }
      setLoading(false);
    };

    loadPose();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!pose) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pose Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested yoga pose could not be found.
          </p>
          <button
            onClick={() => router.push('/all')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            View All Poses
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push('/all');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PoseDetail pose={pose} showBackButton={true} onBack={handleBack} />
    </div>
  );
}
