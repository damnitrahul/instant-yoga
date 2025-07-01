import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vibe coded with 💜 by{' '}
            <Link
              href="https://damnitrahul.com"
              className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              damnitrahul
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
