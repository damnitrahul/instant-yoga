import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {FilterProvider} from '../contexts/FilterContext';
import ClientWrapper from '../components/ClientWrapper';
import {getYogaData} from '../utils/yogaData';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Instant Yoga - Find Your Perfect Pose',
  description:
    'Discover yoga poses with our instant yoga pose finder. Filter by category and difficulty to find the perfect pose for your practice.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const yogaData = getYogaData();

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-purple-50/30 via-white to-indigo-50/30`}
      >
        <FilterProvider>
          <ClientWrapper yogaData={yogaData}>{children}</ClientWrapper>
        </FilterProvider>
      </body>
    </html>
  );
}
