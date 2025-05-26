'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${isHomePage ? 'bg-transparent absolute w-full z-50' : 'bg-[#1B2537]'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              <Image src="/images/logomccblanc@300x-8.png" alt="Logo" width={150} height={150} />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`hover:text-yellow-600 ${pathname === '/' ? 'text-yellow-600 border-b-2 border-yellow-600' : ''}`}
            >
              ACCUEIL
            </Link>
            <Link 
              href="/about" 
              className={`hover:text-yellow-600 ${pathname === '/about' ? 'text-yellow-600 border-b-2 border-yellow-600' : ''}`}
            >
              QUI SOMMES NOUS ?
            </Link>
            <Link 
              href="/projects" 
              className={`hover:text-yellow-600 ${pathname === '/projects' ? 'text-yellow-600 border-b-2 border-yellow-600' : ''}`}
            >
              NOS PROJETS
            </Link>
            <Link 
              href="/support" 
              className={`hover:text-yellow-600 ${pathname === '/support' ? 'text-yellow-600 border-b-2 border-yellow-600' : ''}`}
            >
              NOUS SOUTENIR
            </Link>
            <Link 
              href="/partnership" 
              className={`hover:text-yellow-600 ${pathname === '/partnership' ? 'text-yellow-600 border-b-2 border-yellow-600' : ''}`}
            >
              PARTENARIAT
            </Link>
            <Link 
              href="/donate"
              className={`bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 ${pathname === '/donate' ? 'ring-2 ring-yellow-400' : ''}`}
            >
              FAIRE UN DON
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Menu"
            >
              {isMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-[#1B2537] transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          <Link 
            href="/" 
            className={`block hover:text-yellow-600 py-2 ${pathname === '/' ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            ACCUEIL
          </Link>
          <Link 
            href="/about" 
            className={`block hover:text-yellow-600 py-2 ${pathname === '/about' ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            QUI SOMMES NOUS ?
          </Link>
          <Link 
            href="/projects" 
            className={`block hover:text-yellow-600 py-2 ${pathname === '/projects' ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            NOS PROJETS
          </Link>
          <Link 
            href="/support" 
            className={`block hover:text-yellow-600 py-2 ${pathname === '/support' ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            NOUS SOUTENIR
          </Link>
          <Link 
            href="/partnership" 
            className={`block hover:text-yellow-600 py-2 ${pathname === '/partnership' ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            PARTENARIAT
          </Link>
          <Link 
            href="/donate"
            className={`block bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 text-center ${pathname === '/donate' ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            FAIRE UN DON
          </Link>
        </div>
      </div>
    </nav>
  );
} 