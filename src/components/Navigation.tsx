'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '../utils/helpers';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-x-8 py-2">
          <Link
            href="/"
            className={cn(
              'py-2 px-4 font-medium text-sm transition-all duration-200 rounded-2xl',
              isActive('/')
                ? 'text-purple-600 bg-gradient-to-r from-purple-500/10 to-indigo-500/10'
                : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/50'
            )}
          >
            Random
          </Link>
          <Link
            href="/all"
            className={cn(
              'py-2 px-4 font-medium text-sm transition-all duration-200 rounded-2xl',
              isActive('/all')
                ? 'text-purple-600 bg-gradient-to-r from-purple-500/10 to-indigo-500/10'
                : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/50'
            )}
          >
            All Poses
          </Link>
        </div>
      </div>
    </nav>
  );
}
