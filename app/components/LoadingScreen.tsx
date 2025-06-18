"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    // Animation du logo après un court délai
    const logoTimer = setTimeout(() => setShowLogo(true), 300)

    // Simulation de progression de chargement
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => {
      clearTimeout(logoTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-lg transform rotate-45 animate-float"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-500/20 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500/10 rounded-lg transform rotate-12 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-yellow-400/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500/20 rounded-lg transform -rotate-12 animate-float"></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo avec animations */}
        <div className="relative w-48 h-48 mb-8">
          {/* Cercles animés en arrière-plan */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 border-4 border-blue-200 rounded-full animate-spin-slow opacity-30"></div>
            <div className="absolute w-44 h-44 border-4 border-yellow-300 rounded-full animate-spin-reverse opacity-40"></div>
            <div className="absolute w-32 h-32 border-4 border-green-300 rounded-full animate-spin opacity-20"></div>
          </div>

          {/* Logo principal */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
              showLogo ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative w-40 h-40 animate-pulse-gentle">
              <Image
                src="/images/logomccnoir@300x-8.png"
                fill
                alt="MCC Logo"
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Texte de chargement */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2 animate-fade-in">MCC</h2>
          <p className="text-gray-600 animate-fade-in-delayed">Chargement en cours...</p>
        </div>

        {/* Barre de progression */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 rounded-full transition-all duration-300 ease-out animate-shimmer"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Pourcentage */}
        <div className="text-sm text-gray-500 font-medium">{Math.round(Math.min(progress, 100))}%</div>

        {/* Points de chargement animés */}
        <div className="flex space-x-2 mt-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-1"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce-3"></div>
        </div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-float-particle-${i + 1}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
