"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Logo from "@/components/Logo"

export default function Navigation() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Détection du scroll pour changer l'apparence de la navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: "/", label: "ACCUEIL" },
    { href: "/about", label: "QUI SOMMES NOUS ?" },
    { href: "/projects", label: "NOS PROJETS" },
    { href: "/support", label: "NOUS SOUTENIR" },
    { href: "/partnership", label: "PARTENARIAT" },
  ]

  return (
    <>
      <nav
        className={`
          fixed top-0 w-full z-50 transition-all duration-500 ease-out
          ${
            isHomePage && !isScrolled
              ? "bg-transparent"
              : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          }
        `}
      >
        {/* Formes géométriques décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 right-20 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-4 right-40 w-2 h-2 bg-blue-500 rounded-full opacity-40"></div>
          <div className="absolute bottom-2 left-32 w-4 h-4 bg-green-500 rounded-lg transform rotate-45 opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="transform transition-all duration-300 hover:scale-105" onClick={closeMenu}>
                <Logo />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center">
              {/* Liens de navigation */}
              <div className="flex items-center space-x-8 mr-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative font-medium text-sm tracking-wide transition-all duration-300 group
                      ${
                        isActive(link.href)
                          ? isHomePage && !isScrolled
                            ? "text-yellow-400"
                            : "text-blue-600"
                          : isHomePage && !isScrolled
                            ? "text-black hover:text-yellow-400"
                            : "text-gray-700 hover:text-blue-600"
                      }
                    `}
                    style={{ zIndex: 2 }}
                  >
                    {link.label}

                    {/* Indicateur de page active */}
                    <span
                      className={`
                        absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 
                        transition-all duration-300 transform origin-left
                        ${isActive(link.href) ? "w-full scale-x-100" : "w-0 group-hover:w-full group-hover:scale-x-100"}
                      `}
                    />

                    {/* Effet de survol */}
                    <span
                      className={`
                        absolute inset-0 rounded-lg transition-all duration-300 transform scale-95 opacity-0
                        group-hover:scale-100 group-hover:opacity-100
                        ${isHomePage && !isScrolled ? "bg-white/10" : "bg-blue-50"}
                      `}
                      style={{ zIndex: -1 }}
                    />
                  </Link>
                ))}
              </div>

              {/* Bouton Don - Style spécial */}
              <div className="relative" style={{ zIndex: 1 }}>
                <Link
                  href="/donate"
                  className={`
                    relative px-6 py-3 font-semibold text-sm tracking-wide rounded-full
                    transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                    bg-gradient-to-r from-yellow-400 to-yellow-500 text-black
                    hover:from-yellow-500 hover:to-yellow-600
                    ${isActive("/donate") ? "ring-2 ring-yellow-300 ring-offset-2" : ""}
                  `}
                  onClick={closeMenu}
                >
                  <span className="relative z-10">FAIRE UN DON</span>

                  {/* Effet de brillance */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Link>
              </div>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={`
                  relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110
                  ${isHomePage && !isScrolled ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}
                `}
                aria-label="Menu"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`
                      absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300
                      ${isMenuOpen ? "rotate-45 translate-y-2" : "rotate-0 translate-y-0"}
                    `}
                  />
                  <span
                    className={`
                      absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300
                      ${isMenuOpen ? "opacity-0" : "opacity-100"}
                    `}
                  />
                  <span
                    className={`
                      absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300
                      ${isMenuOpen ? "-rotate-45 -translate-y-2" : "rotate-0 translate-y-0"}
                    `}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`
            lg:hidden absolute top-full left-0 w-full
            bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl
            transition-all duration-500 ease-out transform origin-top
            ${
              isMenuOpen
                ? "opacity-100 scale-y-100 translate-y-0"
                : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="px-4 py-6 space-y-4 relative">
            {/* Formes décoratives pour le menu mobile */}
            <div className="absolute top-4 right-8 w-4 h-4 bg-yellow-400 rounded-lg transform rotate-45 opacity-20"></div>
            <div className="absolute bottom-6 left-8 w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>

            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  block py-3 px-4 rounded-xl font-medium text-sm tracking-wide
                  transition-all duration-300 transform hover:scale-105
                  ${
                    isActive(link.href)
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }
                `}
                onClick={closeMenu}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? "slideInLeft 0.5s ease-out forwards" : "none",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Bouton Don Mobile */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/donate"
                className={`
                  block text-center py-4 px-6 font-semibold text-sm tracking-wide rounded-xl
                  transition-all duration-300 transform hover:scale-105
                  bg-gradient-to-r from-yellow-400 to-yellow-500 text-black
                  hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl
                  ${isActive("/donate") ? "ring-2 ring-yellow-300" : ""}
                `}
                onClick={closeMenu}
                style={{
                  animationDelay: `${navLinks.length * 100}ms`,
                  animation: isMenuOpen ? "slideInLeft 0.5s ease-out forwards" : "none",
                }}
              >
                FAIRE UN DON
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay pour fermer le menu mobile */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={closeMenu} />}

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
