'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className={`${isHomePage ? 'bg-transparent absolute w-full z-50' : 'bg-[#1B2537]'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              MCC
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-yellow-600">
              ACCUEIL
            </Link>
            <Link href="/about" className="hover:text-yellow-600">
              QUI SOMMES NOUS ?
            </Link>
            <Link href="/projects" className="hover:text-yellow-600">
              NOS PROJETS
            </Link>
            <Link href="/support" className="hover:text-yellow-600">
              NOUS SOUTENIR
            </Link>
            <Link href="/partnership" className="hover:text-yellow-600">
              PARTENARIAT
            </Link>
            <Link 
              href="/donate"
              className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700"
            >
              FAIRE UN DON
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-white">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile dropdown - à implémenter si nécessaire */}
    </nav>
  );
} 